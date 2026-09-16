# DevPilot System Architecture

**📚 Navigation:** [← Main README](../../README.md) | [Overview](../overview/README.md) | [Agents](AGENTS.md) | [Directory Structure](../development/DIRECTORY_STRUCTURE.md)

## Overview

DevPilot is built as a modern, scalable AI engineering platform using a microservices-inspired architecture with a monorepo structure. The system is designed for modularity, extensibility, and performance while maintaining simplicity in development and deployment.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Layer                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Web App    │  │   VS Code    │  │  CLI Tool    │          │
│  │  (Next.js)   │  │   Extension  │  │  (Node.js)   │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
└─────────┼──────────────────┼──────────────────┼─────────────────┘
          │                  │                  │
          └──────────────────┼──────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                      API Gateway Layer                           │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           API Gateway (Express/Fastify)                   │  │
│  │  - Authentication & Authorization                         │  │
│  │  - Rate Limiting                                          │  │
│  │  - Request Routing                                        │  │
│  │  - Response Caching                                       │  │
│  └──────────────────────────┬───────────────────────────────┘  │
└─────────────────────────────┼───────────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────────┐
│                      Service Layer                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │  User Svc   │  │  Repo Svc   │  │  Chat Svc   │            │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │  AI Svc     │  │  Eval Svc   │  │  Webhook Svc│            │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘            │
└─────────┼──────────────────┼──────────────────┼────────────────┘
          │                  │                  │
┌─────────┼──────────────────┼──────────────────┼────────────────┐
│         │                  │                  │                  │
│  ┌──────▼──────┐  ┌───────▼──────┐  ┌────────▼──────┐         │
│  │ PostgreSQL  │  │   Redis      │  │   Vector DB   │         │
│  └─────────────┘  └──────────────┘  └───────────────┘         │
└────────────────────────────────────────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────────┐
│                    AI Orchestration Layer                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Agent Orchestrator                            │  │
│  │  - Agent Selection & Coordination                          │  │
│  │  - Tool Routing & Execution                                │  │
│  │  - Memory Management                                        │  │
│  │  - Response Aggregation                                     │  │
│  └──────────────────────────┬───────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                 RAG Engine                                 │  │
│  │  - Vector Search                                           │  │
│  │  - Context Assembly                                        │  │
│  │  - Hybrid Search (Keyword + Semantic)                      │  │
│  │  - Re-ranking & Filtering                                  │  │
│  └──────────────────────────┬───────────────────────────────┘  │
└─────────────────────────────┼───────────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────────┐
│                      Agent Layer                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │CodeAnalysis │  │BugDetection │  │TestGen      │            │
│  │   Agent     │  │   Agent     │  │   Agent     │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │Documentation│  │  Review     │  │Performance  │            │
│  │   Agent     │  │   Agent     │  │   Agent     │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
└────────────────────────────────────────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────────┐
│                      Tool/MCP Layer                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │  GitHub MCP │  │  Filesystem │  │  Jira MCP   │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │  Database   │  │  CI/CD      │  │  Custom     │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
└────────────────────────────────────────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────────┐
│                   External Services                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │   GitHub    │  │   Jira      │  │  OpenAI/    │            │
│  │   API       │  │   API       │  │  Anthropic  │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
└────────────────────────────────────────────────────────────────┘
```

## Component Architecture

### 1. Frontend Application (Next.js)

**Purpose**: User interface for interacting with DevPilot

**Key Components**:
- **Chat Interface**: Real-time conversation with AI
- **Repository Browser**: Browse and analyze connected repositories
- **Dashboard**: Overview of activity, insights, and metrics
- **Settings**: User preferences, integrations, and configurations
- **Code Viewer**: Syntax-highlighted code display with annotations

**Architecture**:
- **App Router**: Next.js 14+ app directory structure
- **Server Components**: React Server Components for performance
- **Client Components**: Interactive UI components
- **API Routes**: Backend communication via API routes
- **State Management**: React Context + Server State
- **Real-time**: WebSocket for live updates

**Key Libraries**:
- Next.js 14+ (App Router)
- React 18+
- TypeScript
- Tailwind CSS
- shadcn/ui
- Monaco Editor
- SWR/TanStack Query

### 2. API Gateway (Express/Fastify)

**Purpose**: Central entry point for all API requests

**Responsibilities**:
- **Authentication**: JWT validation, session management
- **Authorization**: Role-based access control
- **Rate Limiting**: Per-user and per-endpoint limits
- **Request Routing**: Route requests to appropriate services
- **Response Caching**: Cache frequent responses
- **Request Validation**: Validate and sanitize inputs
- **Error Handling**: Centralized error handling
- **Logging**: Request/response logging

**Middleware Stack**:
```
Request → CORS → Security → Rate Limit → Auth → Validation → Routing → Response
```

**API Design**:
- **REST**: Standard REST endpoints for CRUD operations
- **GraphQL**: Optional GraphQL for complex queries
- **WebSocket**: Real-time communication
- **Webhooks**: External event handling

### 3. Service Layer

**Purpose**: Business logic and domain-specific operations

#### User Service
- User management and authentication
- Team and organization management
- User preferences and settings
- Permission management

#### Repository Service
- GitHub integration
- Repository indexing and parsing
- Code storage and retrieval
- Webhook handling

#### Chat Service
- Conversation management
- Message storage and retrieval
- Context management
- User interaction tracking

#### AI Service
- LLM integration
- Agent orchestration
- Tool execution
- Response generation

#### Evaluation Service
- Agent performance tracking
- Quality metrics
- User feedback collection
- A/B testing

#### Webhook Service
- External webhook handling
- Event processing
- Retry logic
- Dead letter queue

### 4. Data Layer

#### PostgreSQL (Primary Database)

**Schema**:
```sql
-- Users & Authentication
users
teams
team_members
sessions
permissions

-- Repositories
repositories
repository_files
repository_commits
repository_prs

-- Conversations
conversations
messages
context
agent_executions

-- AI & Agents
agent_configs
tool_configs
embeddings
memory

-- Evaluation
evaluations
metrics
feedback
ab_tests
```

**Connection Pooling**: PgBouncer for connection management
**Backup**: Daily backups with point-in-time recovery
**Replication**: Read replicas for scaling reads

#### Redis (Cache & Queue)

**Use Cases**:
- **Session Storage**: Fast session data access
- **Response Caching**: Cache LLM responses
- **Rate Limiting**: Distributed rate limiting
- **Job Queue**: Background job processing
- **Pub/Sub**: Real-time updates

**Data Structures**:
- Strings: Simple key-value
- Hashes: Complex objects
- Lists: Job queues
- Sets: Unique collections
- Sorted Sets: Leaderboards, rankings

#### Vector Database (Pinecone/Weaviate)

**Purpose**: Store and search code/document embeddings

**Collections**:
- `code_embeddings`: Code file embeddings
- `doc_embeddings`: Documentation embeddings
- `conversation_embeddings`: Conversation history
- `pattern_embeddings`: Code pattern embeddings

**Indexing Strategy**:
- **Chunking**: Split code into logical chunks
- **Embedding Model**: OpenAI text-embedding-3-small/large
- **Metadata**: Language, file path, complexity, etc.
- **Hybrid Search**: Vector + keyword search

### 5. AI Orchestration Layer

#### Agent Orchestrator

**Purpose**: Coordinate agent execution and communication

**Components**:
- **Agent Registry**: Discover and manage agents
- **Task Router**: Route tasks to appropriate agents
- **Execution Engine**: Execute agents with proper isolation
- **Response Aggregator**: Combine agent responses
- **Memory Manager**: Manage agent memory
- **Tool Router**: Route tool calls to appropriate tools

**Execution Flow**:
```
User Request → Task Analysis → Agent Selection → Agent Execution → 
Tool Execution → Response Aggregation → Memory Update → Response
```

#### RAG Engine

**Purpose**: Retrieve relevant context for AI responses

**Components**:
- **Embedding Generator**: Generate embeddings for code/docs
- **Vector Search**: Semantic search in vector database
- **Keyword Search**: Traditional keyword search
- **Hybrid Search**: Combine vector and keyword results
- **Context Assembly**: Assemble relevant context
- **Re-ranking**: Re-rank results by relevance
- **Context Window Management**: Manage context limits

**Pipeline**:
```
Query → Embedding → Vector Search → Keyword Search → 
Hybrid Ranking → Context Assembly → Context Window → Output
```

### 6. Agent Layer

**Purpose**: Specialized AI agents for different tasks

**Agent Architecture**:
- **Base Agent**: Common functionality and interfaces
- **Specialized Agents**: Domain-specific implementations
- **Agent Memory**: Short-term and long-term memory
- **Tool Access**: Controlled access to tools
- **Communication**: Agent-to-agent communication

**Isolation**:
- **Process Isolation**: Each agent in separate process
- **Resource Limits**: CPU, memory, time limits
- **Sandboxing**: Restricted file system and network access
- **Permission System**: Scoped permissions per agent

### 7. Tool/MCP Layer

**Purpose**: Interface with external systems and services

**MCP Architecture**:
- **MCP Client**: Standard MCP client implementation
- **Tool Registry**: Register and discover tools
- **Tool Execution**: Execute tools with proper error handling
- **Tool Authorization**: Permission checks for tool access
- **Tool Monitoring**: Monitor tool usage and performance

**Available Tools**:
- **GitHub MCP**: Repository operations, PR management
- **Filesystem MCP**: File operations (sandboxed)
- **Jira MCP**: Ticket management and operations
- **Database MCP**: Database operations
- **CI/CD MCP**: Pipeline operations
- **Custom Tools**: Domain-specific tools

## Data Flow

### Request Flow

```
1. User sends request via frontend
2. Frontend sends to API Gateway
3. API Gateway validates and authenticates
4. Request routed to appropriate service
5. Service processes request
6. If AI needed, forward to AI Service
7. AI Service orchestrates agents
8. Agents use tools via MCP
9. Response flows back through layers
10. Frontend displays response to user
```

### AI Request Flow

```
1. User asks question about code
2. Chat Service receives request
3. AI Service analyzes request
4. Agent Orchestrator selects agents
5. RAG Engine retrieves relevant context
6. Agents execute with context
7. Agents use tools via MCP
8. Responses aggregated
9. Memory updated
10. Response returned to user
```

### Repository Indexing Flow

```
1. User connects repository
2. Webhook Service receives GitHub webhook
3. Repository Service fetches changes
4. Files parsed and indexed
5. Embeddings generated
6. Vector database updated
7. PostgreSQL updated
8. Cache invalidated
9. User notified
```

## Security Architecture

### Authentication & Authorization

**Authentication**:
- **GitHub OAuth**: Primary authentication method
- **JWT Tokens**: Session tokens with expiration
- **Session Management**: Secure session storage
- **MFA Support**: Optional multi-factor authentication

**Authorization**:
- **RBAC**: Role-based access control
- **ABAC**: Attribute-based access control
- **Resource Permissions**: Repository-level permissions
- **API Scopes**: Scoped API access

### Data Security

**Encryption**:
- **At Rest**: AES-256 encryption for sensitive data
- **In Transit**: TLS 1.3 for all communications
- **Secret Management**: HashiCorp Vault or AWS Secrets Manager

**Input Validation**:
- **Schema Validation**: Validate all inputs against schemas
- **Sanitization**: Sanitize user inputs
- **SQL Injection Prevention**: Parameterized queries
- **XSS Prevention**: Output encoding and CSP

### Network Security

**Isolation**:
- **VPC**: Private network for services
- **Security Groups**: Restrict access between services
- **API Gateway**: Single entry point
- **WAF**: Web Application Firewall

**Rate Limiting**:
- **Per-User**: Limit requests per user
- **Per-IP**: Limit requests per IP address
- **Per-Endpoint**: Different limits per endpoint
- **Global**: System-wide limits

## Scalability Architecture

### Horizontal Scaling

**Stateless Services**:
- API Gateway
- AI Service
- Evaluation Service
- Webhook Service

**Scaling Strategy**:
- **Kubernetes**: Container orchestration
- **Auto-scaling**: Scale based on CPU/memory/custom metrics
- **Load Balancing**: Distribute traffic across instances
- **Health Checks**: Monitor service health

### Vertical Scaling

**Stateful Services**:
- PostgreSQL
- Redis
- Vector Database

**Scaling Strategy**:
- **Read Replicas**: Scale database reads
- **Sharding**: Partition data across instances
- **Caching**: Reduce database load
- **Connection Pooling**: Efficient connection management

### Caching Strategy

**Multi-level Caching**:
- **Browser Cache**: Client-side caching
- **CDN Cache**: Edge caching for static assets
- **Application Cache**: In-memory cache (Redis)
- **Database Cache**: Query result caching
- **Response Cache**: LLM response caching

**Cache Invalidation**:
- **Time-based**: TTL-based expiration
- **Event-based**: Invalidate on data changes
- **Manual**: Manual cache invalidation
- **Selective**: Cache only frequently accessed data

## Monitoring & Observability

### Logging

**Log Levels**:
- **ERROR**: Critical errors requiring immediate attention
- **WARN**: Warning messages for potential issues
- **INFO**: Informational messages
- **DEBUG**: Detailed debugging information

**Log Storage**:
- **Centralized Logging**: ELK Stack or CloudWatch
- **Log Retention**: 30 days default, 90 days for errors
- **Log Aggregation**: Aggregate logs from all services
- **Log Analysis**: Search and analyze logs

### Metrics

**Key Metrics**:
- **Business Metrics**: User engagement, feature usage
- **Application Metrics**: Response times, error rates
- **Infrastructure Metrics**: CPU, memory, disk, network
- **AI Metrics**: Agent performance, LLM usage

**Monitoring Tools**:
- **Prometheus**: Metrics collection
- **Grafana**: Metrics visualization
- **Alertmanager**: Alert management
- **Custom Dashboards**: Business-specific dashboards

### Tracing

**Distributed Tracing**:
- **OpenTelemetry**: Standard tracing instrumentation
- **Jaeger/Tempo**: Trace storage and analysis
- **Trace Context**: Propagate trace context across services
- **Span Analysis**: Analyze performance bottlenecks

### Alerting

**Alert Types**:
- **Critical**: Immediate notification (PagerDuty)
- **High**: Notification within 5 minutes (Slack)
- **Medium**: Notification within 1 hour (Email)
- **Low**: Daily digest (Email)

**Alert Channels**:
- **PagerDuty**: Critical alerts
- **Slack**: High and medium alerts
- **Email**: All alerts
- **Dashboard**: Visual alert status

## Deployment Architecture

### Environments

**Development**:
- Local development with Docker Compose
- Shared staging for team testing
- Feature flags for gradual rollout

**Staging**:
- Production-like environment
- Automated testing
- Performance testing
- Security scanning

**Production**:
- High availability setup
- Multi-region deployment
- Disaster recovery
- Blue-green deployments

### Deployment Strategy

**CI/CD Pipeline**:
```
Code Push → Tests → Build → Security Scan → 
Staging Deploy → E2E Tests → Production Deploy → Monitoring
```

**Deployment Methods**:
- **Blue-Green**: Zero-downtime deployments
- **Canary**: Gradual rollout with monitoring
- **Rolling**: Incremental instance replacement
- **Rollback**: Automated rollback on failure

### Infrastructure as Code

**Tools**:
- **Terraform**: Infrastructure provisioning
- **Docker**: Containerization
- **Kubernetes**: Container orchestration
- **Helm**: Kubernetes package management

**Configuration Management**:
- **Environment Variables**: Sensitive configuration
- **Config Maps**: Non-sensitive configuration
- **Secrets Management**: Secure secret storage
- **Configuration Drift Detection**: Monitor configuration changes

## Technology Rationale

### Frontend: Next.js 14+
- **Server Components**: Improved performance and SEO
- **App Router**: Modern routing and layouts
- **API Routes**: Backend-for-frontend pattern
- **TypeScript**: Type safety across the stack
- **Ecosystem**: Large ecosystem and community

### Backend: Node.js + Express/Fastify
- **JavaScript Across Stack**: Consistent language
- **Async/Await**: Natural async handling
- **NPM Ecosystem**: Large package ecosystem
- **Performance**: Good performance for I/O operations
- **Community**: Large community and support

### Database: PostgreSQL
- **Relational**: ACID compliance and reliability
- **JSON Support**: Flexible schema with JSONB
- **Full-Text Search**: Built-in search capabilities
- **Extensions**: Rich extension ecosystem
- **Maturity**: Mature and well-tested

### Vector Database: Pinecone
- **Managed Service**: No infrastructure management
- **Performance**: Excellent query performance
- **Scalability**: Automatic scaling
- **API**: Simple and well-documented API
- **Integration**: Good integration with LangChain

### LLM: OpenAI GPT-4
- **Performance**: Best-in-class performance
- **Context Window**: Large context window
- **Reliability**: High reliability and uptime
- **API**: Well-documented API
- **Ecosystem**: Large ecosystem and tools

### Orchestration: LangChain
- **Abstractions**: High-level abstractions for LLM apps
- **Integration**: Integrates with many LLM providers
- **Tools**: Rich tool ecosystem
- **Memory**: Built-in memory management
- **Community**: Large and active community

## Future Architecture Considerations

### Potential Improvements

**Microservices**:
- Split monolith into microservices
- Service mesh for inter-service communication
- Event-driven architecture
- CQRS pattern for read/write separation

**Edge Computing**:
- Deploy services to edge locations
- Reduce latency for global users
- Edge caching and computation
- CDN integration

**Advanced AI**:
- Custom model fine-tuning
- Multi-modal AI (code + docs + images)
- Reinforcement learning from human feedback
- Continuous model improvement

**Blockchain**:
- Immutable audit logs
- Smart contract integration
- Decentralized identity
- Token-based incentives

---

**📗 Related Documents:**
- [Agent Specifications](AGENTS.md) - Detailed agent implementations
- [Directory Structure](../development/DIRECTORY_STRUCTURE.md) - File organization
- [Integration Guidelines](../development/INTEGRATION.md) - External integrations
- [Implementation Plan](../planning/PLAN.md) - Overall project plan

**Document Version**: 1.0
**Last Updated**: 2026-09-14
**Next Review**: 2026-10-14
