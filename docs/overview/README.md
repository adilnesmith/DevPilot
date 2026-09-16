# DevPilot - AI Engineering Assistant Platform

**📚 Navigation:** [← Back to Main README](../../README.md) | [Implementation Plan](../planning/PLAN.md) | [Architecture](../technical/ARCHITECTURE.md)

## Overview

DevPilot is an intelligent engineering platform that enables developers and teams to interact with their codebase using natural language. By combining RAG (Retrieval-Augmented Generation), autonomous agents, tools, MCP (Model Context Protocol), structured outputs, evaluation, memory, and human approval workflows, DevPilot transforms how engineers understand, modify, and improve code.

## Vision

Think of DevPilot as a mini Cursor/Codex-style engineering platform, but specifically designed around a company's codebase and engineering standards. It's not just an AI assistant—it's a comprehensive AI engineering companion that learns your codebase, understands your standards, and helps your team ship better code faster.

## Core Capabilities

### 🔍 Code Understanding
- **"How does checkout work?"** - Get detailed explanations of complex flows
- **"Why is this service slow?"** - Performance analysis and bottleneck identification
- **"Search our engineering documentation"** - Intelligent documentation retrieval

### 🐛 Bug Detection & Prevention
- **"Find potential bugs in this PR"** - Automated code review and bug detection
- **"Review this code against our company standards"** - Standards compliance checking
- **"Create test cases for this API"** - Automated test generation

### ✨ Feature Development
- **"Implement this feature"** - Feature implementation with context awareness
- **"Refactor this component"** - Smart refactoring suggestions
- **"Add error handling"** - Proactive error handling improvements

### 🛠️ Development Workflow
- **GitHub Integration** - Connect repositories, analyze PRs, generate commits
- **Jira Integration** - Link development work to tickets and requirements
- **Documentation Search** - Search through engineering docs with semantic understanding
- **Test Generation** - Create comprehensive test suites automatically

## Architecture

```
┌─────────────────────────────────────────────┐
│              React/Next.js Frontend         │
│         (Chat Interface, Dashboard)         │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│            Node.js API Layer                │
│    (REST/GraphQL endpoints, Auth, Rate Limit)│
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│         AI Orchestration Layer               │
│  (Agent coordination, Tool routing, Memory) │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│              LLM Integration                 │
│   (OpenAI, Anthropic, or custom models)      │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│           RAG / Vector Database               │
│   (Code embeddings, Doc search, Context)     │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│              Multi-Agent System              │
│  (Code Agent, Doc Agent, Test Agent, etc.)   │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│          Tools / MCP Integration             │
│  (GitHub, Jira, File system, CI/CD, etc.)    │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│      External Services & Data Sources        │
│  (GitHub, Jira, Documentation, Tests, etc.)  │
└─────────────────────────────────────────────┘
```

## Key Features

### 🧠 Intelligent Context Understanding
- **RAG-powered**: Retrieves relevant code, documentation, and context
- **Memory System**: Remembers previous conversations and decisions
- **Semantic Search**: Understands intent, not just keywords

### 🤖 Multi-Agent Architecture
- **Specialized Agents**: Code analysis, documentation, testing, review agents
- **Agent Orchestration**: Coordinates multiple agents for complex tasks
- **Human-in-the-loop**: Approval workflows for critical changes

### 🔧 Extensible Tool System
- **MCP Integration**: Standard protocol for tool integrations
- **Custom Tools**: Build domain-specific tools for your needs
- **Tool Routing**: Intelligent tool selection based on context

### 📊 Structured Outputs & Evaluation
- **Type-safe Responses**: Structured JSON outputs for reliability
- **Quality Metrics**: Evaluate agent performance and accuracy
- **Continuous Improvement**: Learn from feedback and usage patterns

### 🔒 Enterprise-Grade Security
- **Access Control**: Role-based permissions and approvals
- **Audit Logs**: Track all AI interactions and changes
- **Secret Management**: Secure handling of API keys and credentials

## Technology Stack

### Frontend
- **Next.js 14+**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: High-quality UI components
- **Monaco Editor**: Code editing and display

### Backend
- **Node.js 20+**: Runtime environment
- **Express/Fastify**: API framework
- **TypeScript**: End-to-end type safety
- **Prisma**: Database ORM
- **PostgreSQL**: Primary database

### AI/ML
- **LangChain**: LLM orchestration framework
- **OpenAI/Anthropic**: LLM providers
- **Vector Database**: Pinecone/Weaviate/Qdrant
- **Embeddings**: Code and documentation embeddings

### Infrastructure
- **Docker**: Containerization
- **GitHub Actions**: CI/CD
- **Vercel/AWS**: Deployment
- **Redis**: Caching and job queues

## Project Structure

```
DevPilot/
├── .devin/                 # Devin CLI configuration
│   ├── skills/            # Custom agent skills
│   └── config.json        # Project configuration
├── apps/
│   ├── frontend/          # Next.js frontend application
│   └── backend/           # Node.js API server
├── packages/
│   ├── ai-core/           # AI orchestration and agent system
│   ├── rag-engine/        # RAG and vector database integration
│   ├── tools-sdk/         # Tools and MCP integration
│   ├── evaluation/        # Evaluation and metrics framework
│   └── shared/            # Shared utilities and types
├── docs/                  # Documentation
├── scripts/               # Development and deployment scripts
├── tests/                 # Integration and E2E tests
├── AGENTS.md             # Agent specifications
├── SKILLS.md             # Skill definitions
├── ARCHITECTURE.md       # System architecture
├── PLAN.md               # Implementation plan
├── PHASES.md             # Development phases
├── EVALUATION.md         # Evaluation framework
├── INTEGRATION.md        # Integration guidelines
└── STANDARDS.md          # Engineering standards
```

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm (recommended) or npm
- Docker (for local development)
- GitHub account (for integration)
- OpenAI/Anthropic API key

### Installation

```bash
# Clone the repository
git clone https://github.com/yourorg/DevPilot.git
cd DevPilot

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development servers
pnpm dev
```

### Quick Start

1. **Connect a Repository**: Link your GitHub repository
2. **Ask a Question**: Start with "How does authentication work?"
3. **Review the Response**: AI provides detailed explanation with code references
4. **Iterate**: Ask follow-up questions or request changes
5. **Implement**: Use AI suggestions to implement features or fix bugs

## Documentation

- [Architecture](../technical/ARCHITECTURE.md) - System architecture and design decisions
- [Implementation Plan](../planning/PLAN.md) - Detailed implementation plan
- [Development Phases](../planning/PHASES.md) - Development roadmap and milestones
- [Agent Specifications](../technical/AGENTS.md) - Agent specifications and capabilities
- [Skill Definitions](../technical/SKILLS.md) - Agent skill definitions
- [Evaluation Framework](../quality/EVALUATION.md) - Evaluation framework and metrics
- [Integration Guidelines](../development/INTEGRATION.md) - Integration guidelines
- [Engineering Standards](../development/STANDARDS.md) - Engineering standards and best practices

## Development Phases

### Phase 1: Foundation (Weeks 1-4)
- Project setup and infrastructure
- Basic UI and API structure
- GitHub integration
- Simple code Q&A capability

### Phase 2: Core AI (Weeks 5-8)
- RAG implementation
- Vector database setup
- Multi-agent system
- Tool integration framework

### Phase 3: Advanced Features (Weeks 9-12)
- Advanced agents (testing, review, documentation)
- MCP integration
- Memory system
- Evaluation framework

### Phase 4: Enterprise Features (Weeks 13-16)
- Authentication and authorization
- Approval workflows
- Audit logging
- Performance optimization

### Phase 5: Polish & Launch (Weeks 17-20)
- UI/UX improvements
- Documentation
- Testing and QA
- Deployment and monitoring

## Custom Agents

DevPilot includes specialized agents for different engineering tasks:

- **CodeAnalysisAgent**: Analyzes code structure, patterns, and complexity
- **BugDetectionAgent**: Identifies potential bugs and vulnerabilities
- **TestGenerationAgent**: Creates comprehensive test suites
- **DocumentationAgent**: Generates and maintains documentation
- **ReviewAgent**: Reviews code against standards and best practices
- **PerformanceAgent**: Analyzes performance bottlenecks
- **RefactoringAgent**: Suggests and performs refactoring
- **FeatureAgent**: Implements new features with context awareness

See [AGENTS.md](AGENTS.md) for detailed agent specifications.

## Contributing

We welcome contributions! Please see our contributing guidelines for details.

## License

See [LICENSE](LICENSE) for details.

## Roadmap

- [ ] Multi-repository support
- [ ] Custom model support
- [ ] Advanced analytics and insights
- [ ] Mobile app
- [ ] Self-hosted option
- [ ] Plugin marketplace

## Support

For support, questions, or feedback, please open an issue or contact our team.

---

**Built with ❤️ for engineers who want to ship better code faster.**
