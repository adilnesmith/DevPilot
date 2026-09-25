import express, { Router, Request, Response } from 'express';
import { RepositoryService } from '../../../services/repositories/RepositoryService';
import { AuthService } from '../../../services/auth/AuthService';
import { ValidationError, AuthenticationError } from '@devpilot/shared';

const router = Router();
const authService = new AuthService();

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
    // Store access token from request body if available
    req.accessToken = req.body.accessToken;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
    return;
  }
};

// Apply authentication middleware to all routes
router.use(authenticate);

// Get user repositories
router.get('/', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const userId = req.user.id;
    const repositoryService = new RepositoryService(req.accessToken || '');
    
    const repositories = await repositoryService.getUserRepositories(userId);
    res.json(repositories);
  } catch (error) {
    console.error('Get repositories error:', error);
    res.status(500).json({ error: 'Failed to fetch repositories' });
  }
});

// Sync repositories from GitHub
router.post('/sync', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const userId = req.user.id;
    const accessToken = req.accessToken || req.body.accessToken;

    if (!accessToken) {
      throw new ValidationError('Access token is required');
    }

    const repositoryService = new RepositoryService(accessToken);
    const repositories = await repositoryService.syncUserRepositories(userId);
    
    res.json(repositories);
  } catch (error) {
    console.error('Sync repositories error:', error);
    res.status(500).json({ error: 'Failed to sync repositories' });
  }
});

// Get single repository
router.get('/:id', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const userId = req.user.id;
    const repositoryId = req.params.id;
    
    const repositoryService = new RepositoryService(req.body.accessToken || '');
    const repository = await repositoryService.getRepository(repositoryId, userId);
    
    res.json(repository);
  } catch (error) {
    console.error('Get repository error:', error);
    if (error instanceof ValidationError) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to fetch repository' });
    }
  }
});

// Refresh repository
router.post('/:id/refresh', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const userId = req.user.id;
    const repositoryId = req.params.id;
    const { accessToken } = req.body;

    if (!accessToken) {
      throw new ValidationError('Access token is required');
    }

    const repositoryService = new RepositoryService(accessToken);
    const repository = await repositoryService.refreshRepository(repositoryId, userId, accessToken);
    
    res.json(repository);
  } catch (error) {
    console.error('Refresh repository error:', error);
    if (error instanceof ValidationError) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to refresh repository' });
    }
  }
});

// Delete repository
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const userId = req.user.id;
    const repositoryId = req.params.id;
    
    const repositoryService = new RepositoryService(req.body.accessToken || '');
    await repositoryService.deleteRepository(repositoryId, userId);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Delete repository error:', error);
    if (error instanceof ValidationError) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to delete repository' });
    }
  }
});

export default router;