import express, { Router, Request, Response } from 'express';
import { GitHubOAuth } from '../../../services/auth/GitHubOAuth';
import { AuthService } from '../../../services/auth/AuthService';
import { ValidationError } from '@devpilot/shared';

const router = Router();
const gitHubOAuth = new GitHubOAuth();
const authService = new AuthService();

router.get('/github', (req: Request, res: Response) => {
  if (!gitHubOAuth.isConfigured()) {
    return res.status(500).json({ 
      error: 'GitHub OAuth not configured',
      message: 'Please set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in environment variables'
    });
  }

  const redirectUri = `${process.env.FRONTEND_URL}/auth/callback`;
  const authUrl = gitHubOAuth.getAuthUrl(redirectUri);
  res.json({ authUrl });
});

router.post('/github/callback', async (req: Request, res: Response) => {
  try {
    if (!gitHubOAuth.isConfigured()) {
      return res.status(500).json({ 
        error: 'GitHub OAuth not configured',
        message: 'Please set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in environment variables'
      });
    }

    const { code } = req.body;

    if (!code) {
      throw new ValidationError('Code is required');
    }

    // Exchange code for token
    const tokenResponse = await gitHubOAuth.exchangeCodeForToken(code);
    
    // Get user info
    const userInfo = await gitHubOAuth.getUserInfo(tokenResponse.access_token);
    
    // Create or update user
    const authResponse = await authService.findOrCreateUser({
      githubId: userInfo.id.toString(),
      username: userInfo.login,
      email: userInfo.email || undefined,
      avatarUrl: userInfo.avatar_url,
      accessToken: tokenResponse.access_token,
    });

    res.json(authResponse);
  } catch (error) {
    console.error('GitHub OAuth callback error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

router.post('/logout', async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    if (!token) {
      throw new ValidationError('Token is required');
    }

    await authService.logout(token);
    res.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
});

router.get('/me', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization as string | undefined;
    const token = authHeader?.replace('Bearer ', '') || '';

    if (!token) {
      throw new ValidationError('Token is required');
    }

    const user = await authService.validateToken(token);
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
