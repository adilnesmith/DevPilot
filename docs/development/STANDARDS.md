# DevPilot Engineering Standards

**📚 Navigation:** [← Main README](../../README.md) | [Overview](../overview/README.md) | [Directory Structure](DIRECTORY_STRUCTURE.md) | [Evaluation](../quality/EVALUATION.md)

## Overview

This document defines the engineering standards, best practices, and conventions for the DevPilot project. All team members should follow these standards to ensure code quality, maintainability, and consistency across the codebase.

## Code Style and Formatting

### TypeScript Standards

#### General Rules
- Use TypeScript for all new code
- Enable strict mode in tsconfig.json
- Avoid `any` types - use specific types or `unknown`
- Use interfaces for object shapes, types for unions/intersections
- Prefer `const` over `let` when possible
- Use template literals for string concatenation

#### Naming Conventions
- **Variables/Functions**: camelCase (`userName`, `getUserData`)
- **Classes/Interfaces**: PascalCase (`UserService`, `IDataRepository`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRIES`, `API_BASE_URL`)
- **Private Members**: prefixed with underscore (`_privateMethod`)
- **Files**: kebab-case (`user-service.ts`, `api-client.ts`)

#### Type Definitions
```typescript
// Good - Specific types
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// Bad - Using any
function processUser(user: any) {
  // ...
}

// Good - Union types
type Status = 'pending' | 'active' | 'inactive';

// Good - Generic types
interface Repository<T> {
  findById(id: string): Promise<T>;
  save(entity: T): Promise<void>;
}
```

#### Function Signatures
```typescript
// Good - Explicit parameter and return types
async function getUserById(id: string): Promise<User> {
  return await database.users.findById(id);
}

// Good - Destructuring with types
async function updateUser({ id, ...updates }: Partial<User> & { id: string }): Promise<User> {
  return await database.users.update(id, updates);
}
```

### React/Next.js Standards

#### Component Structure
```typescript
// Good - Component structure
interface ComponentProps {
  title: string;
  onAction: () => void;
  disabled?: boolean;
}

export function MyComponent({ title, onAction, disabled = false }: ComponentProps) {
  // Hooks at the top
  const [state, setState] = useState(null);
  
  // Event handlers
  const handleClick = useCallback(() => {
    if (!disabled) {
      onAction();
    }
  }, [disabled, onAction]);
  
  // Render
  return (
    <button onClick={handleClick} disabled={disabled}>
      {title}
    </button>
  );
}
```

#### Hooks Usage
- Use hooks at the top level of components
- Custom hooks should start with `use`
- Use `useCallback` for functions passed to children
- Use `useMemo` for expensive computations
- Keep hooks dependency arrays accurate

#### File Organization
```
components/
  feature/
    FeatureComponent.tsx
    FeatureComponent.test.tsx
    FeatureComponent.types.ts
    index.ts
```

### CSS/Styling Standards

#### Tailwind CSS
- Use Tailwind utility classes for styling
- Extract repeated patterns to components
- Use `@apply` for complex reusable patterns
- Follow mobile-first responsive design

#### CSS Modules
```css
/* Good - CSS modules */
.container {
  display: flex;
  gap: 1rem;
}

.button {
  @apply px-4 py-2 bg-blue-500 text-white rounded;
}
```

## Architecture Patterns

### Layered Architecture

```
Presentation Layer (Components)
    ↓
Business Logic Layer (Services)
    ↓
Data Access Layer (Repositories)
    ↓
Database/External APIs
```

### Service Layer Pattern

```typescript
// Good - Service layer
class UserService {
  constructor(
    private userRepository: UserRepository,
    private emailService: EmailService
  ) {}

  async createUser(data: CreateUserDto): Promise<User> {
    // Validation
    this.validateUserData(data);
    
    // Business logic
    const user = await this.userRepository.create(data);
    await this.emailService.sendWelcomeEmail(user.email);
    
    return user;
  }

  private validateUserData(data: CreateUserDto): void {
    if (!data.email || !this.isValidEmail(data.email)) {
      throw new ValidationError('Invalid email');
    }
  }
}
```

### Repository Pattern

```typescript
// Good - Repository pattern
interface UserRepository {
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  create(data: CreateUserDto): Promise<User>;
  update(id: string, data: UpdateUserDto): Promise<User>;
  delete(id: string): Promise<void>;
}

class PostgresUserRepository implements UserRepository {
  constructor(private db: Database) {}

  async findById(id: string): Promise<User> {
    const result = await this.db.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }
  
  // ... other methods
}
```

### Dependency Injection

```typescript
// Good - Dependency injection
class ChatService {
  constructor(
    private agentOrchestrator: AgentOrchestrator,
    private contextManager: ContextManager,
    private memoryStore: MemoryStore
  ) {}
}

// Usage
const chatService = new ChatService(
  new AgentOrchestrator(),
  new ContextManager(),
  new MemoryStore()
);
```

## API Design Standards

### REST API Conventions

#### Endpoint Design
- Use nouns for resource names
- Use plural nouns for collections
- Use kebab-case for URLs
- Use HTTP verbs appropriately

```
GET    /api/users           # List users
GET    /api/users/:id       # Get specific user
POST   /api/users           # Create user
PUT    /api/users/:id       # Update user
DELETE /api/users/:id       # Delete user
```

#### Response Format
```typescript
// Good - Consistent response format
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    requestId: string;
  };
}
```

#### Error Handling
```typescript
// Good - Error response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": {
      "field": "email",
      "value": "invalid-email"
    }
  },
  "meta": {
    "timestamp": "2026-09-14T10:30:00Z",
    "requestId": "req_123456"
  }
}
```

### API Versioning

- Include version in URL: `/api/v1/users`
- Maintain backward compatibility when possible
- Document deprecated endpoints
- Provide migration guides for breaking changes

## Database Standards

### Schema Design

#### Naming Conventions
- Table names: snake_case plural (`users`, `user_sessions`)
- Column names: snake_case (`created_at`, `user_id`)
- Primary keys: `id` (UUID)
- Foreign keys: `{table}_id` (`user_id`, `repository_id`)
- Timestamps: `created_at`, `updated_at`

#### Index Design
- Add indexes on foreign keys
- Add indexes on frequently queried columns
- Use composite indexes for multi-column queries
- Monitor index usage and remove unused indexes

#### Migration Standards
```typescript
// Good - Migration example
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('email').unique().notNullable();
    table.string('name').notNullable();
    table.timestamps(true, true);
    
    table.index('email');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}
```

### Query Standards

#### Query Optimization
- Use parameterized queries to prevent SQL injection
- Select only needed columns
- Use joins efficiently
- Use transactions for multi-step operations
- Implement pagination for large result sets

```typescript
// Good - Optimized query
async function getUsersByEmail(email: string): Promise<User[]> {
  return this.db.query(
    'SELECT id, name, email FROM users WHERE email = $1',
    [email]
  );
}

// Bad - Selecting all columns
async function getUsersByEmail(email: string): Promise<User[]> {
  return this.db.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
}
```

## Testing Standards

### Unit Testing

#### Test Structure
```typescript
describe('UserService', () => {
  let userService: UserService;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = createMockUserRepository();
    userService = new UserService(mockUserRepository);
  });

  describe('createUser', () => {
    it('should create user with valid data', async () => {
      const userData = { name: 'John', email: 'john@example.com' };
      const expectedUser = { id: '1', ...userData };

      mockUserRepository.create.mockResolvedValue(expectedUser);

      const result = await userService.createUser(userData);

      expect(result).toEqual(expectedUser);
      expect(mockUserRepository.create).toHaveBeenCalledWith(userData);
    });

    it('should throw error for invalid email', async () => {
      const userData = { name: 'John', email: 'invalid' };

      await expect(userService.createUser(userData))
        .rejects.toThrow(ValidationError);
    });
  });
});
```

#### Test Coverage
- Aim for >90% coverage on critical paths
- >80% coverage overall
- Test edge cases and error conditions
- Mock external dependencies

### Integration Testing

```typescript
describe('User API Integration', () => {
  let app: Express;
  let testDatabase: TestDatabase;

  beforeAll(async () => {
    testDatabase = await setupTestDatabase();
    app = createApp({ database: testDatabase });
  });

  afterAll(async () => {
    await testDatabase.cleanup();
  });

  it('should create user via API', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'John', email: 'john@example.com' });

    expect(response.status).toBe(201);
    expect(response.body.data.email).toBe('john@example.com');
  });
});
```

### E2E Testing

```typescript
test('complete user registration flow', async ({ page }) => {
  await page.goto('/register');
  
  await page.fill('[name="name"]', 'John Doe');
  await page.fill('[name="email"]', 'john@example.com');
  await page.fill('[name="password"]', 'securepassword');
  
  await page.click('[type="submit"]');
  
  await expect(page).toHaveURL('/dashboard');
  await expect(page.locator('[data-testid="welcome-message"]')).toBeVisible();
});
```

## Security Standards

### Authentication
- Use OAuth 2.0 for third-party authentication
- Use JWT for session tokens
- Implement token refresh mechanism
- Store tokens securely (httpOnly cookies)
- Implement proper logout and token revocation

### Authorization
- Implement role-based access control (RBAC)
- Use principle of least privilege
- Validate permissions on every request
- Log authorization failures
- Regularly audit permissions

### Data Protection
- Encrypt sensitive data at rest
- Use TLS for all communications
- Never log sensitive information
- Implement data retention policies
- Comply with GDPR/CCPA as applicable

### Input Validation
```typescript
// Good - Input validation
function validateUserInput(data: CreateUserDto): void {
  if (!data.email || !isValidEmail(data.email)) {
    throw new ValidationError('Invalid email');
  }
  
  if (data.name && data.name.length > 100) {
    throw new ValidationError('Name too long');
  }
  
  if (data.password && data.password.length < 8) {
    throw new ValidationError('Password too short');
  }
}
```

### SQL Injection Prevention
```typescript
// Good - Parameterized queries
async function getUserById(id: string): Promise<User> {
  return this.db.query('SELECT * FROM users WHERE id = $1', [id]);
}

// Bad - String concatenation
async function getUserById(id: string): Promise<User> {
  return this.db.query(`SELECT * FROM users WHERE id = '${id}'`);
}
```

## Performance Standards

### Response Time Targets
- API responses: <200ms (p50), <500ms (p95)
- Page load: <2s (p50), <3s (p95)
- Database queries: <100ms (p50), <200ms (p95)
- Agent execution: <3s (p50), <5s (p95)

### Caching Strategy
- Cache frequently accessed data
- Use appropriate cache TTL
- Implement cache invalidation
- Monitor cache hit rates
- Use CDN for static assets

### Database Optimization
- Use connection pooling
- Implement query optimization
- Add appropriate indexes
- Use read replicas for scaling
- Monitor slow queries

### Code Optimization
```typescript
// Good - Efficient code
async function getUsersByIds(ids: string[]): Promise<User[]> {
  // Single query with IN clause
  return this.db.query(
    'SELECT * FROM users WHERE id = ANY($1)',
    [ids]
  );
}

// Bad - N+1 query problem
async function getUsersByIds(ids: string[]): Promise<User[]> {
  const users: User[] = [];
  for (const id of ids) {
    const user = await this.db.query('SELECT * FROM users WHERE id = $1', [id]);
    users.push(user);
  }
  return users;
}
```

## Documentation Standards

### Code Documentation
```typescript
/**
 * Creates a new user in the system
 * 
 * @param data - User creation data
 * @param data.name - User's full name
 * @param data.email - User's email address
 * @param data.password - User's password (will be hashed)
 * @returns Promise<User> - Created user with generated ID
 * @throws {ValidationError} If validation fails
 * @throws {DuplicateError} If email already exists
 * 
 * @example
 * ```typescript
 * const user = await userService.createUser({
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   password: 'securepassword'
 * });
 * ```
 */
async function createUser(data: CreateUserDto): Promise<User> {
  // Implementation
}
```

### API Documentation
- Use OpenAPI/Swagger for API documentation
- Document all endpoints
- Include request/response examples
- Document error responses
- Keep documentation in sync with code

### README Standards
Each package should have a README with:
- Package description
- Installation instructions
- Usage examples
- API documentation link
- Contributing guidelines

## Git Standards

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Build process or auxiliary tool changes

#### Examples
```
feat(auth): add OAuth2.0 authentication

Implement OAuth2.0 authentication flow with GitHub integration.
Users can now authenticate using their GitHub accounts.

Closes #123
```

```
fix(api): handle rate limiting correctly

Add proper rate limiting handling for GitHub API calls.
Implement exponential backoff for rate limit errors.

Fixes #456
```

### Branch Strategy
- `main`: Production code
- `develop`: Development code
- `feature/*`: Feature branches
- `bugfix/*`: Bug fix branches
- `hotfix/*`: Production hotfixes

### Pull Request Standards
- Descriptive title and description
- Link to related issues
- Include screenshots for UI changes
- All tests must pass
- Code review required
- Update documentation if needed

## CI/CD Standards

### Pipeline Stages
1. **Lint**: Code linting and formatting
2. **Test**: Unit and integration tests
3. **Build**: Build artifacts
4. **Security**: Security scanning
5. **Deploy**: Deploy to environment

### Quality Gates
- All tests must pass
- Code coverage >80%
- No critical security vulnerabilities
- Linting must pass
- Build must succeed

### Deployment Standards
- Use semantic versioning
- Tag releases in git
- Maintain changelog
- Rollback plan for each deployment
- Monitor deployments

## Monitoring and Logging Standards

### Logging Levels
- `error`: Critical errors requiring immediate attention
- `warn`: Warning messages for potential issues
- `info`: Informational messages
- `debug': Detailed debugging information

### Log Format
```typescript
logger.info('User created', {
  userId: user.id,
  email: user.email,
  timestamp: new Date().toISOString()
});
```

### Monitoring Metrics
- Track key performance indicators
- Set up alerts for critical metrics
- Monitor system health
- Track business metrics
- Regular performance reviews

## Code Review Standards

### Review Checklist
- [ ] Code follows project standards
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No sensitive data exposed
- [ ] Error handling is appropriate
- [ ] Performance considerations addressed
- [ ] Security best practices followed
- [ ] Code is readable and maintainable

### Review Process
1. Author creates pull request
2. Automated checks run
3. Reviewers assigned
4. Code review performed
5. Changes requested if needed
6. Approval granted
7. Merge to target branch

## Development Workflow Standards

### Feature Development
1. Create feature branch from develop
2. Implement feature with tests
3. Update documentation
4. Create pull request
5. Address review feedback
6. Merge to develop
7. Deploy to staging for testing

### Bug Fix Process
1. Create bugfix branch from develop
2. Reproduce and fix bug
3. Add regression tests
4. Create pull request
5. Address review feedback
6. Merge to develop
7. Deploy to staging

### Hotfix Process
1. Create hotfix branch from main
2. Implement fix with tests
3. Create pull request
4. Expedited review
5. Merge to main and develop
6. Deploy to production

## Tooling Standards

### Required Tools
- **Node.js**: 20+
- **pnpm**: Package manager
- **TypeScript**: 5+
- **ESLint**: Linting
- **Prettier**: Code formatting
- **Jest**: Testing framework
- **Playwright**: E2E testing

### Configuration Files
- `.eslintrc.json`: ESLint configuration
- `.prettierrc.json`: Prettier configuration
- `tsconfig.json`: TypeScript configuration
- `.editorconfig`: Editor configuration
- `.gitignore`: Git ignore rules

## AI/ML Standards

### LLM Integration
- Implement proper error handling for LLM calls
- Use streaming responses for better UX
- Implement rate limiting for API calls
- Cache LLM responses when appropriate
- Monitor LLM usage and costs

### Agent Development
- Follow agent interface specification
- Implement proper error handling
- Add comprehensive testing
- Document agent capabilities
- Monitor agent performance

### Evaluation Standards
- Evaluate agent outputs regularly
- Use multiple evaluation metrics
- Include human evaluation
- Track performance over time
- Iterate based on results

## Accessibility Standards

### WCAG Compliance
- Aim for WCAG 2.1 AA compliance
- Provide alt text for images
- Ensure keyboard navigation
- Provide sufficient color contrast
- Support screen readers

### Testing
- Test with screen readers
- Test keyboard navigation
- Test with high contrast mode
- Test with different screen sizes
- Use accessibility testing tools

## Environment Standards

### Development Environment
- Use Docker for local development
- Use environment variables for configuration
- Keep development data separate from production
- Use consistent development setups
- Document development setup process

### Production Environment
- Use containerization
- Implement proper logging
- Use monitoring and alerting
- Implement backup strategies
- Use CDN for static assets

## Compliance Standards

### Data Privacy
- Comply with GDPR/CCPA
- Implement data minimization
- Provide data export functionality
- Implement data deletion
- Document data processing

### Security Compliance
- Regular security audits
- Penetration testing
- Dependency vulnerability scanning
- Security training for team
- Incident response plan

---

**📗 Related Documents:**
- [Directory Structure](DIRECTORY_STRUCTURE.md) - File organization and naming
- [Architecture](../technical/ARCHITECTURE.md) - Architecture patterns
- [Evaluation](../quality/EVALUATION.md) - Testing and quality standards
- [Integration](INTEGRATION.md) - Integration security standards

**Document Version**: 1.0
**Last Updated**: 2026-09-14
**Next Review**: 2026-10-14
**Reviewers**: Engineering Team
**Approval**: Tech Lead
