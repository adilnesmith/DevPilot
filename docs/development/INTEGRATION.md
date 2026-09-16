# DevPilot Integration Guidelines

**📚 Navigation:** [← Main README](../../README.md) | [Overview](../overview/README.md) | [Architecture](../technical/ARCHITECTURE.md) | [Standards](STANDARDS.md)

## Overview

This document provides comprehensive guidelines for integrating DevPilot with external systems, including GitHub, Jira, documentation platforms, and custom integrations. It covers architecture, implementation patterns, security considerations, and best practices.

## Integration Architecture

### Integration Layer

```
┌─────────────────────────────────────────────────────────┐
│                   DevPilot Platform                       │
├─────────────────────────────────────────────────────────┤
│                  Integration Layer                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │  GitHub     │  │   Jira      │  │  Custom     │     │
│  │  Integration│  │ Integration │  │ Integration │     │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘     │
└─────────┼──────────────────┼──────────────────┼─────────┘
          │                  │                  │
┌─────────┼──────────────────┼──────────────────┼─────────┐
│         │                  │                  │          │
│  ┌──────▼──────┐  ┌───────▼──────┐  ┌────────▼──────┐ │
│  │  GitHub API │  │  Jira API    │  │  Custom API   │ │
│  └─────────────┘  └──────────────┘  └───────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Integration Components

1. **API Clients**: HTTP clients for external APIs
2. **Webhook Handlers**: Process incoming webhooks
3. **Data Synchronizers**: Sync data between systems
4. **Authentication**: OAuth and API key management
5. **Rate Limiting**: Respect API rate limits
6. **Error Handling**: Robust error handling and retry logic
7. **Caching**: Cache responses to reduce API calls

## GitHub Integration

### Overview

GitHub integration enables DevPilot to:
- Connect to repositories
- Fetch code and metadata
- Receive webhook events
- Create PRs and issues
- Manage repository access

### Authentication

#### OAuth 2.0 Flow

```typescript
interface GitHubOAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
}

class GitHubOAuth {
  async getAuthorizationUrl(): Promise<string> {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      scope: this.config.scopes.join(' '),
      state: this.generateState()
    });
    return `https://github.com/login/oauth/authorize?${params}`;
  }

  async exchangeCodeForToken(code: string): Promise<string> {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: JSON.stringify({
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        code
      })
    });
    const data = await response.json();
    return data.access_token;
  }
}
```

#### Required Scopes

- `repo`: Full repository access
- `read:org`: Read organization data
- `user`: Read user profile
- `admin:repo_hook`: Manage webhooks

### Repository Connection

```typescript
interface RepositoryConnection {
  owner: string;
  repo: string;
  branch?: string;
  permissions: Permission[];
  webhooks: WebhookConfig[];
}

class GitHubService {
  async connectRepository(config: RepositoryConnection): Promise<Repository> {
    // Verify access
    await this.verifyAccess(config.owner, config.repo);
    
    // Fetch repository metadata
    const metadata = await this.fetchRepositoryMetadata(config);
    
    // Set up webhooks
    await this.setupWebhooks(config);
    
    // Store connection
    return this.storeConnection(config, metadata);
  }

  private async verifyAccess(owner: string, repo: string): Promise<void> {
    try {
      await this.apiClient.get(`/repos/${owner}/${repo}`);
    } catch (error) {
      throw new Error('Repository access denied or not found');
    }
  }
}
```

### Webhook Handling

```typescript
interface GitHubWebhookEvent {
  event: string;
  payload: any;
  signature: string;
  deliveryId: string;
}

class GitHubWebhookHandler {
  async handleWebhook(event: GitHubWebhookEvent): Promise<void> {
    // Verify signature
    this.verifySignature(event);
    
    // Process based on event type
    switch (event.event) {
      case 'push':
        await this.handlePush(event.payload);
        break;
      case 'pull_request':
        await this.handlePullRequest(event.payload);
        break;
      case 'issues':
        await this.handleIssue(event.payload);
        break;
      default:
        console.log(`Unhandled event: ${event.event}`);
    }
  }

  private async handlePush(payload: any): Promise<void> {
    const { repository, commits } = payload;
    
    // Index changed files
    for (const commit of commits) {
      await this.indexCommit(repository, commit);
    }
    
    // Update embeddings
    await this.updateEmbeddings(repository);
  }
}
```

### API Usage

```typescript
class GitHubApiClient {
  private baseUrl = 'https://api.github.com';
  
  async getRepository(owner: string, repo: string): Promise<Repository> {
    return this.request(`/repos/${owner}/${repo}`);
  }

  async getContents(owner: string, repo: string, path: string): Promise<FileContent> {
    return this.request(`/repos/${owner}/${repo}/contents/${path}`);
  }

  async createPullRequest(
    owner: string,
    repo: string,
    pr: PullRequest
  ): Promise<PullRequest> {
    return this.request(`/repos/${owner}/${repo}/pulls`, {
      method: 'POST',
      body: pr
    });
  }

  private async request(endpoint: string, options?: RequestInit): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Accept': 'application/vnd.github.v3+json',
        ...options?.headers
      }
    });
    
    if (!response.ok) {
      throw new GitHubError(response.status, await response.text());
    }
    
    return response.json();
  }
}
```

### Rate Limiting

```typescript
class GitHubRateLimiter {
  private rateLimit = 5000; // requests per hour
  private remaining = this.rateLimit;
  private resetTime: Date;

  async acquire(): Promise<void> {
    if (this.remaining <= 100) {
      const waitTime = this.resetTime.getTime() - Date.now();
      if (waitTime > 0) {
        await this.sleep(waitTime);
      }
    }
    this.remaining--;
  }

  updateFromHeaders(headers: Headers): void {
    this.remaining = parseInt(headers.get('X-RateLimit-Remaining') || '0');
    this.resetTime = new Date(
      parseInt(headers.get('X-RateLimit-Reset') || '0') * 1000
    );
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

## Jira Integration

### Overview

Jira integration enables DevPilot to:
- Link development work to tickets
- Fetch ticket requirements
- Update ticket status
- Create comments and attachments
- Sync development progress

### Authentication

#### API Token Authentication

```typescript
interface JiraAuthConfig {
  baseUrl: string;
  email: string;
  apiToken: string;
}

class JiraAuth {
  getAuthHeaders(): Record<string, string> {
    const credentials = Buffer.from(
      `${this.config.email}:${this.config.apiToken}`
    ).toString('base64');
    
    return {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json'
    };
  }
}
```

### Ticket Integration

```typescript
class JiraService {
  async getTicket(ticketId: string): Promise<JiraTicket> {
    const response = await fetch(
      `${this.config.baseUrl}/rest/api/3/issue/${ticketId}`,
      { headers: this.auth.getAuthHeaders() }
    );
    return response.json();
  }

  async updateTicket(ticketId: string, update: TicketUpdate): Promise<void> {
    await fetch(
      `${this.config.baseUrl}/rest/api/3/issue/${ticketId}`,
      {
        method: 'PUT',
        headers: this.auth.getAuthHeaders(),
        body: JSON.stringify(update)
      }
    );
  }

  async createComment(ticketId: string, comment: string): Promise<void> {
    await fetch(
      `${this.config.baseUrl}/rest/api/3/issue/${ticketId}/comment`,
      {
        method: 'POST',
        headers: this.auth.getAuthHeaders(),
        body: JSON.stringify({ body: { content: comment } })
      }
    );
  }

  async linkToPullRequest(
    ticketId: string,
    prUrl: string
  ): Promise<void> {
    await this.createComment(
      ticketId,
      `Pull request: ${prUrl}`
    );
  }
}
```

### Webhook Integration

```typescript
class JiraWebhookHandler {
  async handleWebhook(event: JiraWebhookEvent): Promise<void> {
    switch (event.webhookEvent) {
      case 'jira:issue_created':
        await this.handleIssueCreated(event);
        break;
      case 'jira:issue_updated':
        await this.handleIssueUpdated(event);
        break;
      case 'comment_created':
        await this.handleCommentCreated(event);
        break;
    }
  }

  private async handleIssueCreated(event: any): Promise<void> {
    const ticket = event.issue;
    
    // Create corresponding task in DevPilot
    await this.createDevPilotTask(ticket);
    
    // Notify team
    await this.notifyTeam(ticket);
  }
}
```

## Documentation Integration

### Overview

Documentation integration enables DevPilot to:
- Index documentation repositories
- Search documentation semantically
- Generate documentation from code
- Keep documentation in sync

### Supported Platforms

#### Confluence

```typescript
class ConfluenceIntegration {
  async getPage(pageId: string): Promise<ConfluencePage> {
    const response = await fetch(
      `${this.baseUrl}/wiki/rest/api/content/${pageId}`,
      { headers: this.authHeaders }
    );
    return response.json();
  }

  async search(query: string): Promise<ConfluencePage[]> {
    const response = await fetch(
      `${this.baseUrl}/wiki/rest/api/search?cql=type=page and text~"${query}"`,
      { headers: this.authHeaders }
    );
    const data = await response.json();
    return data.results;
  }

  async updatePage(pageId: string, content: string): Promise<void> {
    const page = await this.getPage(pageId);
    
    await fetch(
      `${this.baseUrl}/wiki/rest/api/content/${pageId}`,
      {
        method: 'PUT',
        headers: this.authHeaders,
        body: JSON.stringify({
          version: { number: page.version.number + 1 },
          body: { storage: { value: content, representation: 'storage' } }
        })
      }
    );
  }
}
```

#### Notion

```typescript
class NotionIntegration {
  async getPage(pageId: string): Promise<NotionPage> {
    return this.notion.pages.retrieve({ page_id: pageId });
  }

  async search(query: string): Promise<NotionPage[]> {
    const response = await this.notion.search({
      query: query,
      filter: { property: 'object', value: 'page' }
    });
    return response.results;
  }

  async updatePage(pageId: string, content: string): Promise<void> {
    await this.notion.blocks.children.append({
      block_id: pageId,
      children: [{
        object: 'block',
        type: 'paragraph',
        paragraph: { text: [{ type: 'text', text: content }] }
      }]
    });
  }
}
```

## Custom Integrations

### Integration Template

```typescript
interface CustomIntegrationConfig {
  name: string;
  baseUrl: string;
  auth: AuthConfig;
  webhooks: WebhookConfig[];
  mappings: FieldMapping[];
}

abstract class BaseIntegration {
  protected config: CustomIntegrationConfig;
  protected auth: AuthProvider;

  constructor(config: CustomIntegrationConfig) {
    this.config = config;
    this.auth = this.createAuthProvider(config.auth);
  }

  abstract connect(): Promise<ConnectionResult>;
  abstract fetchResource(resourceId: string): Promise<any>;
  abstract pushResource(resource: any): Promise<void>;
  abstract handleWebhook(event: any): Promise<void>;

  protected async request(
    endpoint: string,
    options?: RequestInit
  ): Promise<any> {
    const url = `${this.config.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.auth.getHeaders(),
        ...options?.headers
      }
    });
    
    if (!response.ok) {
      throw new IntegrationError(response.status, await response.text());
    }
    
    return response.json();
  }
}
```

### MCP Integration

```typescript
class MCPIntegration extends BaseIntegration {
  private mcpClient: MCPClient;

  async connect(): Promise<ConnectionResult> {
    this.mcpClient = new MCPClient(this.config.baseUrl);
    await this.mcpClient.connect();
    
    return {
      status: 'connected',
      capabilities: await this.mcpClient.getCapabilities()
    };
  }

  async fetchResource(resourceId: string): Promise<any> {
    return this.mcpClient.callTool('read_resource', { resourceId });
  }

  async pushResource(resource: any): Promise<void> {
    return this.mcpClient.callTool('write_resource', resource);
  }

  async handleWebhook(event: any): Promise<void> {
    await this.mcpClient.notify(event);
  }
}
```

## Security Considerations

### Credential Management

```typescript
class CredentialManager {
  private vault: SecretVault;

  async storeCredential(
    integrationId: string,
    credential: Credential
  ): Promise<void> {
    const encrypted = await this.encrypt(credential);
    await this.vault.store(`integration:${integrationId}`, encrypted);
  }

  async getCredential(integrationId: string): Promise<Credential> {
    const encrypted = await this.vault.retrieve(`integration:${integrationId}`);
    return this.decrypt(encrypted);
  }

  private async encrypt(data: Credential): Promise<string> {
    // Encryption logic
  }

  private async decrypt(encrypted: string): Promise<Credential> {
    // Decryption logic
  }
}
```

### OAuth Security

- Use state parameter to prevent CSRF
- Validate redirect URIs
- Use PKCE for public clients
- Store tokens securely
- Implement token refresh
- Revoke tokens on disconnect

### API Key Security

- Never log API keys
- Rotate keys regularly
- Use least privilege principle
- Monitor key usage
- Revoke compromised keys immediately

### Webhook Security

```typescript
class WebhookSecurity {
  verifySignature(
    payload: string,
    signature: string,
    secret: string
  ): boolean {
    const expectedSignature = this.computeSignature(payload, secret);
    return this.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  }

  private computeSignature(payload: string, secret: string): string {
    return crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');
  }

  private timingSafeEqual(a: Buffer, b: Buffer): boolean {
    if (a.length !== b.length) return false;
    
    let result = 0;
    for (let i = 0; i < a.length; i++) {
      result |= a[i] ^ b[i];
    }
    
    return result === 0;
  }
}
```

## Error Handling

### Retry Logic

```typescript
class RetryHandler {
  async withRetry<T>(
    fn: () => Promise<T>,
    options: RetryOptions = {}
  ): Promise<T> {
    const {
      maxRetries = 3,
      delay = 1000,
      backoff = 2,
      retryableErrors = [429, 500, 502, 503, 504]
    } = options;

    let lastError: Error;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        
        if (!this.isRetryable(error, retryableErrors)) {
          throw error;
        }
        
        if (attempt < maxRetries) {
          const waitTime = delay * Math.pow(backoff, attempt);
          await this.sleep(waitTime);
        }
      }
    }
    
    throw lastError;
  }

  private isRetryable(error: any, retryableErrors: number[]): boolean {
    return retryableErrors.includes(error.status);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

### Error Recovery

```typescript
class ErrorRecovery {
  async handleIntegrationError(
    integrationId: string,
    error: IntegrationError
  ): Promise<void> {
    // Log error
    await this.logError(integrationId, error);
    
    // Check if recoverable
    if (this.isRecoverable(error)) {
      await this.attemptRecovery(integrationId, error);
    } else {
      await this.notifyAdmin(integrationId, error);
    }
  }

  private isRecoverable(error: IntegrationError): boolean {
    return error.status === 429 || error.status >= 500;
  }

  private async attemptRecovery(
    integrationId: string,
    error: IntegrationError
  ): Promise<void> {
    // Attempt recovery based on error type
    switch (error.status) {
      case 429:
        await this.handleRateLimit(integrationId);
        break;
      case 401:
        await this.refreshAuth(integrationId);
        break;
      default:
        await this.backoff(integrationId);
    }
  }
}
```

## Data Synchronization

### Sync Strategy

```typescript
class DataSynchronizer {
  async syncRepository(repo: Repository): Promise<SyncResult> {
    const lastSync = await this.getLastSyncTime(repo.id);
    const changes = await this.getChangesSince(repo, lastSync);
    
    for (const change of changes) {
      await this.processChange(repo, change);
    }
    
    await this.updateLastSyncTime(repo.id);
    
    return {
      success: true,
      changesProcessed: changes.length,
      timestamp: new Date()
    };
  }

  private async processChange(
    repo: Repository,
    change: Change
  ): Promise<void> {
    switch (change.type) {
      case 'create':
        await this.indexFile(repo, change.file);
        break;
      case 'update':
        await this.updateFile(repo, change.file);
        break;
      case 'delete':
        await this.deleteFile(repo, change.file);
        break;
    }
  }
}
```

### Conflict Resolution

```typescript
class ConflictResolver {
  async resolveConflict(
    local: any,
    remote: any,
    strategy: 'local' | 'remote' | 'merge' = 'merge'
  ): Promise<any> {
    switch (strategy) {
      case 'local':
        return local;
      case 'remote':
        return remote;
      case 'merge':
        return this.merge(local, remote);
      default:
        throw new Error(`Unknown strategy: ${strategy}`);
    }
  }

  private merge(local: any, remote: any): any {
    // Implement merge logic
    return { ...local, ...remote };
  }
}
```

## Monitoring and Logging

### Integration Monitoring

```typescript
class IntegrationMonitor {
  async trackIntegrationCall(
    integrationId: string,
    operation: string,
    duration: number,
    success: boolean
  ): Promise<void> {
    await this.metrics.record({
      integration: integrationId,
      operation,
      duration,
      success,
      timestamp: new Date()
    });
  }

  async getIntegrationStats(
    integrationId: string,
    period: TimePeriod
  ): Promise<IntegrationStats> {
    return this.metrics.query({
      integration: integrationId,
      period
    });
  }
}
```

### Logging

```typescript
class IntegrationLogger {
  logConnection(integrationId: string, status: string): void {
    this.logger.info('Integration connection', {
      integrationId,
      status,
      timestamp: new Date()
    });
  }

  logApiCall(
    integrationId: string,
    endpoint: string,
    duration: number,
    status: number
  ): void {
    this.logger.info('API call', {
      integrationId,
      endpoint,
      duration,
      status,
      timestamp: new Date()
    });
  }

  logError(
    integrationId: string,
    error: Error,
    context: any
  ): void {
    this.logger.error('Integration error', {
      integrationId,
      error: error.message,
      stack: error.stack,
      context,
      timestamp: new Date()
    });
  }
}
```

## Best Practices

### API Design

1. **Consistent Interfaces**: Use consistent interfaces across integrations
2. **Error Handling**: Robust error handling and recovery
3. **Rate Limiting**: Respect rate limits and implement backoff
4. **Caching**: Cache responses to reduce API calls
5. **Idempotency**: Make operations idempotent where possible

### Security

1. **Credential Security**: Never expose credentials in logs
2. **Principle of Least Privilege**: Use minimal required permissions
3. **Token Management**: Implement proper token refresh and revocation
4. **Webhook Security**: Verify webhook signatures
5. **Audit Logging**: Log all integration activities

### Performance

1. **Batch Operations**: Batch API calls when possible
2. **Parallel Processing**: Process independent operations in parallel
3. **Caching**: Cache frequently accessed data
4. **Connection Pooling**: Use connection pooling for HTTP clients
5. **Lazy Loading**: Load data only when needed

### Testing

1. **Mock APIs**: Mock external APIs for testing
2. **Contract Testing**: Test API contracts
3. **Integration Tests**: Test integrations end-to-end
4. **Error Scenarios**: Test error handling and recovery
5. **Performance Tests**: Test integration performance

## Troubleshooting

### Common Issues

#### Authentication Failures
- Check credentials are correct
- Verify token hasn't expired
- Check required scopes/permissions
- Review authentication logs

#### Rate Limiting
- Implement proper rate limiting
- Use caching to reduce calls
- Implement exponential backoff
- Monitor rate limit headers

#### Webhook Failures
- Verify webhook URL is accessible
- Check webhook signature verification
- Review webhook payload format
- Monitor webhook delivery logs

#### Data Sync Issues
- Check last sync timestamp
- Verify conflict resolution strategy
- Review sync logs for errors
- Check for data inconsistencies

---

**📗 Related Documents:**
- [Architecture](../technical/ARCHITECTURE.md) - Integration layer architecture
- [Agents](../technical/AGENTS.md) - Agents that use integrations
- [Standards](STANDARDS.md) - Integration development standards
- [Directory Structure](DIRECTORY_STRUCTURE.md) - Integration file placement

**Document Version**: 1.0
**Last Updated**: 2026-09-14
**Next Review**: 2026-10-14
