# DevPilot Directory Structure

**📚 Navigation:** [← Main README](../../README.md) | [Overview](../overview/README.md) | [Architecture](../technical/ARCHITECTURE.md) | [Standards](STANDARDS.md)

## Overview

This document outlines the complete directory structure for the DevPilot project, including all packages, applications, and configuration files.

## Root Structure

```
DevPilot/
├── .devin/                          # Devin CLI configuration
│   ├── skills/                      # Custom agent skills
│   │   ├── code-analysis/           # Code analysis skills
│   │   ├── bug-detection/           # Bug detection skills
│   │   ├── test-generation/         # Test generation skills
│   │   └── documentation/           # Documentation skills
│   └── config.json                  # Project configuration
├── .github/                         # GitHub configuration
│   ├── workflows/                   # GitHub Actions workflows
│   │   ├── ci.yml                   # Continuous integration
│   │   ├── cd.yml                   # Continuous deployment
│   │   └── security.yml             # Security scanning
│   ├── ISSUE_TEMPLATE/              # Issue templates
│   └── PULL_REQUEST_TEMPLATE.md     # PR template
├── apps/                            # Applications
│   ├── frontend/                    # Next.js frontend
│   └── backend/                     # Node.js backend
├── packages/                        # Shared packages
│   ├── ai-core/                     # AI orchestration
│   ├── rag-engine/                  # RAG implementation
│   ├── tools-sdk/                   # Tools and MCP
│   ├── evaluation/                  # Evaluation framework
│   └── shared/                      # Shared utilities
├── docs/                            # Documentation
├── scripts/                         # Development scripts
├── tests/                           # Integration and E2E tests
├── .env.example                     # Environment variables example
├── .gitignore                       # Git ignore rules
├── LICENSE                          # License file
├── package.json                     # Root package.json
├── pnpm-workspace.yaml              # pnpm workspace configuration
├── tsconfig.json                    # TypeScript configuration
├── README.md                        # Project README
├── PLAN.md                          # Implementation plan
├── AGENTS.md                        # Agent specifications
├── SKILLS.md                        # Skill definitions
├── ARCHITECTURE.md                  # System architecture
├── PHASES.md                        # Development phases
├── EVALUATION.md                    # Evaluation framework
├── INTEGRATION.md                   # Integration guidelines
├── STANDARDS.md                     # Engineering standards
└── DIRECTORY_STRUCTURE.md          # This file
```

## Frontend Application Structure

```
apps/frontend/
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── (auth)/                  # Auth group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/             # Dashboard group
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── repositories/
│   │   │   │   └── page.tsx
│   │   │   ├── chat/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (settings)/              # Settings group
│   │   │   ├── settings/
│   │   │   │   ├── profile/
│   │   │   │   ├── integrations/
│   │   │   │   └── team/
│   │   │   └── layout.tsx
│   │   ├── api/                     # API routes
│   │   │   ├── auth/
│   │   │   ├── chat/
│   │   │   └── repositories/
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Home page
│   │   ├── globals.css              # Global styles
│   │   └── error.tsx                # Error page
│   ├── components/                  # React components
│   │   ├── ui/                      # UI components (shadcn/ui)
│   │   │   ├── button/
│   │   │   ├── input/
│   │   │   ├── card/
│   │   │   └── ...
│   │   ├── chat/                    # Chat components
│   │   │   ├── ChatInterface.tsx
│   │   │   ├── MessageList.tsx
│   │   │   ├── MessageInput.tsx
│   │   │   └── TypingIndicator.tsx
│   │   ├── repository/              # Repository components
│   │   │   ├── RepositoryBrowser.tsx
│   │   │   ├── CodeViewer.tsx
│   │   │   └── FileTree.tsx
│   │   ├── dashboard/               # Dashboard components
│   │   │   ├── StatsCard.tsx
│   │   │   ├── ActivityFeed.tsx
│   │   │   └── MetricsChart.tsx
│   │   └── layout/                  # Layout components
│   │       ├── Header.tsx
│   │       ├── Sidebar.tsx
│   │       └── Footer.tsx
│   ├── lib/                         # Utility libraries
│   │   ├── api/                     # API client
│   │   │   ├── client.ts
│   │   │   ├── chat.ts
│   │   │   └── repositories.ts
│   │   ├── hooks/                   # Custom hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useChat.ts
│   │   │   └── useRepositories.ts
│   │   ├── utils/                   # Utility functions
│   │   │   ├── formatting.ts
│   │   │   ├── validation.ts
│   │   │   └── constants.ts
│   │   └── store/                   # State management
│   │       ├── auth.ts
│   │       ├── chat.ts
│   │       └── repositories.ts
│   ├── styles/                      # Styles
│   │   ├── globals.css
│   │   └── themes.css
│   └── types/                       # TypeScript types
│       ├── api.ts
│       ├── chat.ts
│       └── repository.ts
├── public/                          # Public assets
│   ├── images/
│   ├── icons/
│   └── fonts/
├── .env.local                       # Local environment variables
├── .eslintrc.json                   # ESLint configuration
├── next.config.js                   # Next.js configuration
├── package.json                     # Frontend package.json
├── tailwind.config.js               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
└── postcss.config.js                # PostCSS configuration
```

## Backend Application Structure

```
apps/backend/
├── src/
│   ├── api/                         # API routes
│   │   ├── routes/                  # Route definitions
│   │   │   ├── auth/
│   │   │   │   ├── login.ts
│   │   │   │   ├── logout.ts
│   │   │   │   └── callback.ts
│   │   │   ├── chat/
│   │   │   │   ├── messages.ts
│   │   │   │   └── conversations.ts
│   │   │   ├── repositories/
│   │   │   │   ├── connect.ts
│   │   │   │   ├── sync.ts
│   │   │   │   └── webhooks.ts
│   │   │   ├── agents/
│   │   │   │   ├── execute.ts
│   │   │   │   └── status.ts
│   │   │   └── index.ts
│   │   ├── middleware/              # API middleware
│   │   │   ├── auth.ts
│   │   │   ├── validation.ts
│   │   │   ├── rateLimit.ts
│   │   │   └── errorHandler.ts
│   │   └── validators/              # Request validators
│   │       ├── auth.ts
│   │       ├── chat.ts
│   │       └── repositories.ts
│   ├── services/                    # Business logic
│   │   ├── auth/                    # Authentication service
│   │   │   ├── AuthService.ts
│   │   │   ├── GitHubOAuth.ts
│   │   │   └── SessionManager.ts
│   │   ├── chat/                    # Chat service
│   │   │   ├── ChatService.ts
│   │   │   ├── MessageHandler.ts
│   │   │   └── ContextManager.ts
│   │   ├── repositories/            # Repository service
│   │   │   ├── RepositoryService.ts
│   │   │   ├── GitHubService.ts
│   │   │   ├── CodeParser.ts
│   │   │   └── WebhookHandler.ts
│   │   ├── agents/                  # Agent service
│   │   │   ├── AgentOrchestrator.ts
│   │   │   ├── AgentRegistry.ts
│   │   │   └── AgentExecutor.ts
│   │   ├── users/                   # User service
│   │   │   ├── UserService.ts
│   │   │   ├── TeamService.ts
│   │   │   └── PermissionService.ts
│   │   └── evaluation/              # Evaluation service
│   │       ├── EvaluationService.ts
│   │       ├── MetricsCollector.ts
│   │       └── ReportGenerator.ts
│   ├── models/                      # Database models
│   │   ├── User.ts
│   │   ├── Team.ts
│   │   ├── Repository.ts
│   │   ├── Conversation.ts
│   │   ├── Message.ts
│   │   ├── AgentExecution.ts
│   │   └── Evaluation.ts
│   ├── controllers/                 # Request controllers
│   │   ├── AuthController.ts
│   │   ├── ChatController.ts
│   │   ├── RepositoryController.ts
│   │   └── AgentController.ts
│   ├── middleware/                  # Express middleware
│   │   ├── cors.ts
│   │   ├── helmet.ts
│   │   ├── compression.ts
│   │   └── logging.ts
│   ├── config/                      # Configuration
│   │   ├── database.ts
│   │   ├── redis.ts
│   │   ├── openai.ts
│   │   └── github.ts
│   ├── utils/                       # Utilities
│   │   ├── logger.ts
│   │   ├── errors.ts
│   │   ├── cache.ts
│   │   └── helpers.ts
│   ├── types/                       # TypeScript types
│   │   ├── express.ts
│   │   ├── models.ts
│   │   └── services.ts
│   └── index.ts                     # Application entry point
├── prisma/                          # Prisma ORM
│   ├── schema.prisma                # Database schema
│   ├── migrations/                  # Database migrations
│   └── seed.ts                      # Database seed
├── tests/                           # Tests
│   ├── unit/                        # Unit tests
│   ├── integration/                 # Integration tests
│   └── e2e/                         # E2E tests
├── .env.example                     # Environment variables example
├── .eslintrc.json                   # ESLint configuration
├── package.json                     # Backend package.json
├── tsconfig.json                    # TypeScript configuration
└── Dockerfile                       # Docker configuration
```

## Packages Structure

### AI Core Package

```
packages/ai-core/
├── src/
│   ├── agents/                      # Agent implementations
│   │   ├── base/                    # Base agent
│   │   │   ├── BaseAgent.ts
│   │   │   ├── AgentMemory.ts
│   │   │   └── AgentTools.ts
│   │   ├── specialized/             # Specialized agents
│   │   │   ├── CodeAnalysisAgent.ts
│   │   │   ├── BugDetectionAgent.ts
│   │   │   ├── TestGenerationAgent.ts
│   │   │   ├── DocumentationAgent.ts
│   │   │   ├── ReviewAgent.ts
│   │   │   ├── PerformanceAgent.ts
│   │   │   ├── RefactoringAgent.ts
│   │   │   ├── FeatureAgent.ts
│   │   │   ├── SearchAgent.ts
│   │   │   └── ExplainAgent.ts
│   │   └── orchestration/           # Orchestration
│   │       ├── AgentOrchestrator.ts
│   │       ├── AgentSelector.ts
│   │       ├── TaskRouter.ts
│   │       └── ResponseAggregator.ts
│   ├── llm/                         # LLM integration
│   │   ├── providers/               # LLM providers
│   │   │   ├── OpenAIProvider.ts
│   │   │   ├── AnthropicProvider.ts
│   │   │   └── ProviderInterface.ts
│   │   ├── prompts/                  # Prompt templates
│   │   │   ├── code-analysis.ts
│   │   │   ├── bug-detection.ts
│   │   │   └── test-generation.ts
│   │   └── utils/                   # LLM utilities
│   │       ├── token-counter.ts
│   │       └── stream-handler.ts
│   ├── memory/                      # Memory systems
│   │   ├── short-term/              # Short-term memory
│   │   ├── long-term/               # Long-term memory
│   │   ├── shared/                  # Shared memory
│   │   └── user/                    # User memory
│   ├── tools/                       # Tool system
│   │   ├── registry/                # Tool registry
│   │   ├── executor/                # Tool executor
│   │   ├── authorization/           # Tool authorization
│   │   └── monitoring/              # Tool monitoring
│   └── types/                       # TypeScript types
│       ├── agent.ts
│       ├── llm.ts
│       ├── memory.ts
│       └── tools.ts
├── tests/                           # Tests
├── package.json                     # Package.json
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # Package README
```

### RAG Engine Package

```
packages/rag-engine/
├── src/
│   ├── embeddings/                  # Embedding generation
│   │   ├── generators/              # Embedding generators
│   │   │   ├── OpenAIEmbeddings.ts
│   │   │   └── GeneratorInterface.ts
│   │   ├── chunkers/               # Text chunkers
│   │   │   ├── CodeChunker.ts
│   │   │   ├── DocumentChunker.ts
│   │   │   └── ChunkerInterface.ts
│   │   └── pipelines/              # Embedding pipelines
│   │       └── EmbeddingPipeline.ts
│   ├── vector-store/               # Vector database
│   │   ├── providers/              # Vector DB providers
│   │   │   ├── PineconeStore.ts
│   │   │   ├── WeaviateStore.ts
│   │   │   └── StoreInterface.ts
│   │   ├── indexes/                # Index management
│   │   │   ├── CodeIndex.ts
│   │   │   ├── DocIndex.ts
│   │   │   └── ConversationIndex.ts
│   │   └── search/                 # Search operations
│   │       ├── VectorSearch.ts
│   │       ├── HybridSearch.ts
│   │       └── ReRanker.ts
│   ├── retrieval/                  # Retrieval system
│   │   ├── strategies/             # Retrieval strategies
│   │   │   ├── SemanticRetrieval.ts
│   │   │   ├── KeywordRetrieval.ts
│   │   │   └── HybridRetrieval.ts
│   │   ├── context/                # Context assembly
│   │   │   ├── ContextBuilder.ts
│   │   │   ├── ContextWindow.ts
│   │   │   └── ContextRanker.ts
│   │   └── filters/                # Result filters
│   │       ├── LanguageFilter.ts
│   │       ├── FileTypeFilter.ts
│   │       └── DateFilter.ts
│   └── types/                      # TypeScript types
│       ├── embeddings.ts
│       ├── vector-store.ts
│       └── retrieval.ts
├── tests/                           # Tests
├── package.json                     # Package.json
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # Package README
```

### Tools SDK Package

```
packages/tools-sdk/
├── src/
│   ├── mcp/                         # MCP integration
│   │   ├── client/                  # MCP client
│   │   │   ├── MCPClient.ts
│   │   │   └── ConnectionManager.ts
│   │   ├── servers/                 # MCP servers
│   │   │   ├── GitHubMCPServer.ts
│   │   │   ├── FilesystemMCPServer.ts
│   │   │   └── JiraMCPServer.ts
│   │   └── tools/                   # MCP tools
│   │       ├── ToolRegistry.ts
│   │       ├── ToolExecutor.ts
│   │       └── ToolSchema.ts
│   ├── tools/                       # Built-in tools
│   │   ├── github/                  # GitHub tools
│   │   │   ├── RepositoryTool.ts
│   │   │   ├── PRTool.ts
│   │   │   └── IssueTool.ts
│   │   ├── filesystem/              # Filesystem tools
│   │   │   ├── ReadTool.ts
│   │   │   ├── WriteTool.ts
│   │   │   └── SearchTool.ts
│   │   ├── database/                # Database tools
│   │   │   ├── QueryTool.ts
│   │   │   └── SchemaTool.ts
│   │   └── cicd/                    # CI/CD tools
│   │       ├── PipelineTool.ts
│   │       └── DeployTool.ts
│   ├── sandbox/                     # Tool sandboxing
│   │   ├── isolator/                # Process isolation
│   │   ├── permissions/             # Permission system
│   │   └── monitoring/              # Tool monitoring
│   └── types/                       # TypeScript types
│       ├── mcp.ts
│       ├── tools.ts
│       └── sandbox.ts
├── tests/                           # Tests
├── package.json                     # Package.json
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # Package README
```

### Evaluation Package

```
packages/evaluation/
├── src/
│   ├── metrics/                     # Evaluation metrics
│   │   ├── accuracy/                # Accuracy metrics
│   │   │   ├── ExactMatch.ts
│   │   │   ├── SemanticSimilarity.ts
│   │   │   └── CodeAccuracy.ts
│   │   ├── quality/                 # Quality metrics
│   │   │   ├── Coherence.ts
│   │   │   ├── Relevance.ts
│   │   │   └── Completeness.ts
│   │   └── performance/             # Performance metrics
│   │       ├── ResponseTime.ts
│   │       ├── TokenUsage.ts
│   │       └── SuccessRate.ts
│   ├── evaluators/                  # Evaluators
│   │   ├── automated/               # Automated evaluators
│   │   │   ├── CodeEvaluator.ts
│   │   │   ├── TestEvaluator.ts
│   │   │   └── DocEvaluator.ts
│   │   ├── human/                   # Human evaluation
│   │   │   ├── FeedbackCollector.ts
│   │   │   ├── RatingSystem.ts
│   │   │   └── ReviewWorkflow.ts
│   │   └── comparison/              # Comparison evaluators
│   │       ├── ABTest.ts
│   │       └── ModelComparison.ts
│   ├── reporting/                   # Reporting
│   │   ├── generators/              # Report generators
│   │   │   ├── HTMLReport.ts
│   │   │   ├── JSONReport.ts
│   │   │   └── PDFReport.ts
│   │   ├── dashboards/              # Dashboard data
│   │   │   ├── MetricsDashboard.ts
│   │   │   └── TrendsDashboard.ts
│   │   └── alerts/                  # Alert system
│   │       ├── ThresholdAlert.ts
│   │       └── AnomalyDetection.ts
│   ├── experiments/                 # Experiment management
│   │   ├── design/                  # Experiment design
│   │   │   ├── ExperimentConfig.ts
│   │   │   └── VariantManager.ts
│   │   ├── execution/               # Experiment execution
│   │   │   ├── ExperimentRunner.ts
│   │   │   └── DataCollector.ts
│   │   └── analysis/                # Experiment analysis
│   │       ├── StatisticalAnalysis.ts
│   │       └── SignificanceTest.ts
│   └── types/                       # TypeScript types
│       ├── metrics.ts
│       ├── evaluators.ts
│       └── experiments.ts
├── tests/                           # Tests
├── package.json                     # Package.json
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # Package README
```

### Shared Package

```
packages/shared/
├── src/
│   ├── constants/                   # Constants
│   │   ├── agent.ts
│   │   ├── errors.ts
│   │   └── config.ts
│   ├── types/                       # Shared types
│   │   ├── common.ts
│   │   ├── api.ts
│   │   └── domain.ts
│   ├── utils/                       # Shared utilities
│   │   ├── string.ts
│   │   ├── date.ts
│   │   ├── validation.ts
│   │   └── formatting.ts
│   ├── logger/                      # Logger
│   │   ├── Logger.ts
│   │   └── transports/
│   ├── errors/                      # Error handling
│   │   ├── BaseError.ts
│   │   ├── APIError.ts
│   │   └── ValidationError.ts
│   └── config/                      # Configuration
│       ├── loadConfig.ts
│       └── validateConfig.ts
├── tests/                           # Tests
├── package.json                     # Package.json
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # Package README
```

## Documentation Structure

```
docs/
├── user/                            # User documentation
│   ├── getting-started/
│   │   ├── installation.md
│   │   ├── authentication.md
│   │   └── first-project.md
│   ├── features/
│   │   ├── code-analysis.md
│   │   ├── bug-detection.md
│   │   ├── test-generation.md
│   │   └── documentation.md
│   ├── integrations/
│   │   ├── github.md
│   │   ├── jira.md
│   │   └── custom-tools.md
│   └── api/                         # API documentation
│       ├── authentication.md
│       ├── chat.md
│       └── agents.md
├── developer/                       # Developer documentation
│   ├── architecture/
│   │   ├── overview.md
│   │   ├── components.md
│   │   └── data-flow.md
│   ├── guides/
│   │   ├── adding-agents.md
│   │   ├── creating-tools.md
│   │   └── custom-evaluations.md
│   ├── testing/
│   │   ├── unit-tests.md
│   │   ├── integration-tests.md
│   │   └── e2e-tests.md
│   └── deployment/
│       ├── development.md
│       ├── staging.md
│       └── production.md
└── assets/                          # Documentation assets
    ├── images/
    └── diagrams/
```

## Scripts Structure

```
scripts/
├── development/                     # Development scripts
│   ├── setup.sh                    # Setup development environment
│   ├── dev.sh                      # Start development servers
│   └── test.sh                     # Run tests
├── deployment/                      # Deployment scripts
│   ├── build.sh                    # Build for production
│   ├── deploy.sh                   # Deploy to environment
│   └── rollback.sh                 # Rollback deployment
├── database/                        # Database scripts
│   ├── migrate.sh                  # Run migrations
│   ├── seed.sh                     # Seed database
│   └── backup.sh                   # Backup database
├── maintenance/                     # Maintenance scripts
│   ├── cleanup.sh                  # Cleanup resources
│   ├── cache-clear.sh              # Clear caches
│   └── log-rotate.sh               # Rotate logs
└── monitoring/                      # Monitoring scripts
    ├── health-check.sh             # Health check
    ├── metrics-collect.sh          # Collect metrics
    └── alert-check.sh              # Check alerts
```

## Tests Structure

```
tests/
├── e2e/                            # End-to-end tests
│   ├── auth/
│   │   ├── login.spec.ts
│   │   └── logout.spec.ts
│   ├── chat/
│   │   ├── conversation.spec.ts
│   │   └── agent-execution.spec.ts
│   ├── repositories/
│   │   ├── connection.spec.ts
│   │   └── sync.spec.ts
│   └── integration/
│       ├── github.spec.ts
│       └── jira.spec.ts
├── performance/                    # Performance tests
│   ├── load/
│   │   ├── chat-load.spec.ts
│   │   └── api-load.spec.ts
│   └── stress/
│       ├── concurrent-users.spec.ts
│       └── memory-usage.spec.ts
└── security/                      # Security tests
    ├── authentication/
    │   ├── session-hijacking.spec.ts
    │   └── xss.spec.ts
    ├── authorization/
    │   ├── rbac.spec.ts
    │   └── permission-bypass.spec.ts
    └── api/
        ├── injection.spec.ts
        └── rate-limit.spec.ts
```

## Configuration Files

### Root Configuration Files

```
DevPilot/
├── .env.example                     # Environment variables template
├── .eslintrc.json                   # ESLint configuration
├── .prettierrc.json                 # Prettier configuration
├── .gitignore                       # Git ignore rules
├── .dockerignore                    # Docker ignore rules
├── docker-compose.yml               # Docker Compose configuration
├── package.json                     # Root package.json
├── pnpm-workspace.yaml              # pnpm workspace configuration
├── tsconfig.json                    # Root TypeScript configuration
├── turbo.json                       # Turborepo configuration
├── .nvmrc                           # Node version
├── .editorconfig                    # Editor configuration
└── LICENSE                          # License file
```

### Environment Variables

```env
# Application
NODE_ENV=development
PORT=3000
API_URL=http://localhost:3001

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/devpilot
REDIS_URL=redis://localhost:6379

# Vector Database
VECTOR_DB_URL=https://your-vector-db.com
VECTOR_DB_API_KEY=your-api-key

# LLM
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key

# GitHub
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GITHUB_WEBHOOK_SECRET=your-webhook-secret

# Jira
JIRA_URL=https://your-domain.atlassian.net
JIRA_USERNAME=your-username
JIRA_API_KEY=your-api-key

# Security
JWT_SECRET=your-jwt-secret
SESSION_SECRET=your-session-secret

# Monitoring
SENTRY_DSN=your-sentry-dsn
LOG_LEVEL=debug
```

## File Naming Conventions

### General Rules
- Use kebab-case for files and directories
- Use PascalCase for React components
- Use camelCase for TypeScript/JavaScript files
- Use UPPER_CASE for constants
- Use descriptive names that explain purpose

### Component Files
- `ComponentName.tsx` - React component
- `ComponentName.test.tsx` - Component tests
- `ComponentName.types.ts` - Component types
- `ComponentName.styles.ts` - Component styles

### Service Files
- `ServiceName.ts` - Service implementation
- `ServiceName.test.ts` - Service tests
- `ServiceName.types.ts` - Service types
- `ServiceName.constants.ts` - Service constants

### API Files
- `routeName.ts` - API route
- `routeName.test.ts` - API tests
- `routeName.types.ts` - API types
- `routeName.validator.ts` - API validators

## Import Conventions

### Absolute Imports
Use absolute imports from workspace packages:
```typescript
import { BaseAgent } from '@devpilot/ai-core';
import { VectorStore } from '@devpilot/rag-engine';
```

### Relative Imports
Use relative imports for local files:
```typescript
import { AuthService } from './services/auth/AuthService';
import { Button } from '../components/ui/button';
```

### Barrel Exports
Use barrel exports for cleaner imports:
```typescript
// services/auth/index.ts
export { AuthService } from './AuthService';
export { GitHubOAuth } from './GitHubOAuth';

// Import
import { AuthService, GitHubOAuth } from '@/services/auth';
```

---

**📗 Related Documents:**
- [Architecture](../technical/ARCHITECTURE.md) - System architecture design
- [Standards](STANDARDS.md) - File naming and code conventions
- [Implementation Plan](../planning/PLAN.md) - Project setup and infrastructure
- [Integration](INTEGRATION.md) - Integration file placement

**Document Version**: 1.0
**Last Updated**: 2026-09-14
**Next Review**: 2026-10-14
