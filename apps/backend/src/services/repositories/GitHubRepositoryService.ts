import { Octokit } from 'octokit';

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  private: boolean;
  html_url: string;
  updated_at: string;
  stargazers_count: number;
  forks_count: number;
}

export class GitHubRepositoryService {
  private octokit: Octokit | null = null;

  constructor(accessToken?: string) {
    if (accessToken) {
      this.octokit = new Octokit({ auth: accessToken });
    }
  }

  async getUserRepositories(): Promise<GitHubRepository[]> {
    if (!this.octokit) {
      throw new Error('Octokit not initialized with access token');
    }

    const repositories: GitHubRepository[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await this.octokit.rest.repos.listForAuthenticatedUser({
        per_page: 100,
        page,
        sort: 'updated',
        direction: 'desc',
      });

      repositories.push(...response.data as GitHubRepository[]);
      hasMore = response.data.length === 100;
      page++;
    }

    return repositories;
  }

  async getRepository(owner: string, repo: string): Promise<GitHubRepository> {
    if (!this.octokit) {
      throw new Error('Octokit not initialized with access token');
    }

    const { data } = await this.octokit.rest.repos.get({
      owner,
      repo,
    });

    return data as GitHubRepository;
  }

  async getRepositoryContents(
    owner: string,
    repo: string,
    path: string = ''
  ): Promise<any> {
    if (!this.octokit) {
      throw new Error('Octokit not initialized with access token');
    }

    const { data } = await this.octokit.rest.repos.getContent({
      owner,
      repo,
      path,
    });

    return data;
  }
}