import prisma from '../../config/database';
import { GitHubRepositoryService, GitHubRepository } from './GitHubRepositoryService';
import { ValidationError, AuthenticationError } from '@devpilot/shared';

export class RepositoryService {
  private gitHubService: GitHubRepositoryService;

  constructor(accessToken: string) {
    this.gitHubService = new GitHubRepositoryService(accessToken);
  }

  async syncUserRepositories(userId: string): Promise<any[]> {
    // Fetch repositories from GitHub
    const gitHubRepos = await this.gitHubService.getUserRepositories();

    const syncedRepos = [];

    for (const repo of gitHubRepos) {
      // Check if repository already exists
      const existingRepo = await prisma.repository.findFirst({
        where: {
          userId,
          githubId: repo.id,
        },
      });

      if (existingRepo) {
        // Update existing repository
        const updated = await prisma.repository.update({
          where: { id: existingRepo.id },
          data: {
            name: repo.name,
            fullName: repo.full_name,
            description: repo.description,
            language: repo.language,
            url: repo.html_url,
            isPrivate: repo.private,
            lastSyncedAt: new Date(),
          },
        });
        syncedRepos.push(updated);
      } else {
        // Create new repository
        const created = await prisma.repository.create({
          data: {
            userId,
            githubId: repo.id,
            name: repo.name,
            fullName: repo.full_name,
            description: repo.description,
            language: repo.language,
            url: repo.html_url,
            isPrivate: repo.private,
            lastSyncedAt: new Date(),
          },
        });
        syncedRepos.push(created);
      }
    }

    return syncedRepos;
  }

  async getUserRepositories(userId: string): Promise<any[]> {
    return prisma.repository.findMany({
      where: { userId },
      orderBy: { lastSyncedAt: 'desc' },
    });
  }

  async getRepository(repositoryId: string, userId: string): Promise<any> {
    const repository = await prisma.repository.findFirst({
      where: {
        id: repositoryId,
        userId,
      },
    });

    if (!repository) {
      throw new ValidationError('Repository not found');
    }

    return repository;
  }

  async deleteRepository(repositoryId: string, userId: string): Promise<void> {
    const repository = await prisma.repository.findFirst({
      where: {
        id: repositoryId,
        userId,
      },
    });

    if (!repository) {
      throw new ValidationError('Repository not found');
    }

    await prisma.repository.delete({
      where: { id: repositoryId },
    });
  }

  async refreshRepository(repositoryId: string, userId: string, accessToken: string): Promise<any> {
    const repository = await prisma.repository.findFirst({
      where: {
        id: repositoryId,
        userId,
      },
    });

    if (!repository) {
      throw new ValidationError('Repository not found');
    }

    // Fetch updated data from GitHub
    const [owner, repoName] = repository.fullName.split('/');
    const gitHubRepo = await this.gitHubService.getRepository(owner, repoName);

    // Update repository
    const updated = await prisma.repository.update({
      where: { id: repositoryId },
      data: {
        name: gitHubRepo.name,
        fullName: gitHubRepo.full_name,
        description: gitHubRepo.description,
        language: gitHubRepo.language,
        url: gitHubRepo.html_url,
        isPrivate: gitHubRepo.private,
        lastSyncedAt: new Date(),
      },
    });

    return updated;
  }
}