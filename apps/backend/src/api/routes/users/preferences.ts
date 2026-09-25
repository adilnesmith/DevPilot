import express, { Router, Request, Response } from 'express';
import { UserPreferencesService } from '../../../services/users/UserPreferencesService';
import { AuthService } from '../../../services/auth/AuthService';
import { AuthenticationError } from '@devpilot/shared';

const router = Router();
const authService = new AuthService();
const preferencesService = new UserPreferencesService();

// Middleware to authenticate requests
const authenticate = async (req: Request, res: Response, next: express.NextFunction) => {
  try {
    const authHeader = req.headers.authorization as string | undefined;
    const token = authHeader?.replace('Bearer ', '') || '';

    if (!token) {
      throw new AuthenticationError('Token is required');
    }

    const user = await authService.validateToken(token);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
    return;
  }
};

// Apply authentication middleware to all routes
router.use(authenticate);

// Get user preferences
router.get('/preferences', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const userId = req.user.id;
    const preferences = await preferencesService.getUserPreferences(userId);
    res.json(preferences);
  } catch (error) {
    console.error('Get preferences error:', error);
    res.status(500).json({ error: 'Failed to fetch preferences' });
  }
});

// Update user preferences
router.put('/preferences', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const userId = req.user.id;
    const preferences = await preferencesService.updateUserPreferences(userId, req.body);
    res.json(preferences);
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({ error: 'Failed to update preferences' });
  }
});

// Reset user preferences
router.post('/preferences/reset', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const userId = req.user.id;
    const preferences = await preferencesService.resetUserPreferences(userId);
    res.json(preferences);
  } catch (error) {
    console.error('Reset preferences error:', error);
    res.status(500).json({ error: 'Failed to reset preferences' });
  }
});

export default router;