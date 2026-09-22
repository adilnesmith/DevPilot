# DevPilot - AI Engineering Assistant Platform

## � Quick Start

**Current Status**: Phase 1, Week 1 COMPLETED ✅
- Frontend running: http://localhost:3000
- Backend running: http://localhost:3001
- Infrastructure setup complete

**Quick Setup**:
```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev

# Start databases (optional for Week 1)
docker-compose up -d
```

**📖 For detailed setup and current status**: See [SETUP.md](SETUP.md) or [CURRENT_STATE.md](CURRENT_STATE.md)

**🤖 AI Agents**: Start with the [Documentation Index](docs/INDEX.md) for optimized navigation

**👥 Humans**: Continue below for detailed navigation

This document serves as the main navigation hub for DevPilot documentation. Each section is organized to help you (both humans and AI agents) find the right information quickly.

### � Documentation Navigation
- **[Project Overview](docs/overview/README.md)** - What is DevPilot and why it matters
- **[Getting Started](docs/overview/README.md#getting-started)** - Installation and first steps
- **[Architecture Overview](docs/technical/ARCHITECTURE.md)** - High-level system architecture

### 📋 Planning & Roadmap
- **[Implementation Plan](docs/planning/PLAN.md)** - Detailed 20-week implementation plan
- **[Development Phases](docs/planning/PHASES.md)** - Week-by-week development roadmap
- **[Project Goals](docs/planning/PLAN.md#project-goals)** - Success criteria and metrics

### 🤖 AI & Agents
- **[Agent Specifications](docs/technical/AGENTS.md)** - All 13 specialized agents with capabilities
- **[Skill Definitions](docs/technical/SKILLS.md)** - 37 granular skills for agent tasks
- **[Agent Orchestration](docs/technical/AGENTS.md#agent-orchestration)** - How agents work together

### 🏗️ Technical Architecture
- **[System Architecture](docs/technical/ARCHITECTURE.md)** - Complete system design and components
- **[Directory Structure](docs/development/DIRECTORY_STRUCTURE.md)** - Monorepo organization
- **[Integration Guidelines](docs/development/INTEGRATION.md)** - External system integrations

### 💻 Development
- **[Engineering Standards](docs/development/STANDARDS.md)** - Code style, patterns, and best practices
- **[Directory Structure](docs/development/DIRECTORY_STRUCTURE.md)** - File organization and conventions
- **[Integration Guide](docs/development/INTEGRATION.md)** - GitHub, Jira, and custom integrations

### ✅ Quality & Evaluation
- **[Evaluation Framework](docs/quality/EVALUATION.md)** - Metrics, testing, and continuous improvement
- **[Testing Standards](docs/development/STANDARDS.md#testing-standards)** - Unit, integration, and E2E testing
- **[Performance Targets](docs/development/STANDARDS.md#performance-standards)** - Response time and resource goals

## 🎯 For AI Agents

### Quick Task Navigation
As an AI agent, use this guide to find the right document for your task:

| Task | Document | Section |
|------|----------|---------|
| **Understand project scope** | [Overview](docs/overview/README.md) | Project Overview |
| **Plan implementation** | [Implementation Plan](docs/planning/PLAN.md) | All phases |
| **Implement specific agent** | [Agent Specs](docs/technical/AGENTS.md) | Agent details |
| **Create agent skill** | [Skill Definitions](docs/technical/SKILLS.md) | Skill patterns |
| **Design component** | [Architecture](docs/technical/ARCHITECTURE.md) | Component design |
| **Set up directory** | [Directory Structure](docs/development/DIRECTORY_STRUCTURE.md) | File organization |
| **Integrate external system** | [Integration Guide](docs/development/INTEGRATION.md) | Integration patterns |
| **Write code** | [Standards](docs/development/STANDARDS.md) | Code style guide |
| **Write tests** | [Evaluation](docs/quality/EVALUATION.md) | Testing framework |
| **Review code** | [Standards](docs/development/STANDARDS.md) | Code review checklist |

### Agent-Specific Navigation
- **CodeAnalysisAgent** → [Agent Spec](docs/technical/AGENTS.md#1-codeanalysisagent)
- **BugDetectionAgent** → [Agent Spec](docs/technical/AGENTS.md#2-bugdetectionagent)
- **TestGenerationAgent** → [Agent Spec](docs/technical/AGENTS.md#3-testgenerationagent)
- **DocumentationAgent** → [Agent Spec](docs/technical/AGENTS.md#4-documentationagent)
- **ReviewAgent** → [Agent Spec](docs/technical/AGENTS.md#5-reviewagent)
- **PerformanceAgent** → [Agent Spec](docs/technical/AGENTS.md#6-performanceagent)
- **RefactoringAgent** → [Agent Spec](docs/technical/AGENTS.md#7-refactoringagent)
- **FeatureAgent** → [Agent Spec](docs/technical/AGENTS.md#8-featureagent)
- **SearchAgent** → [Agent Spec](docs/technical/AGENTS.md#9-searchagent)
- **ExplainAgent** → [Agent Spec](docs/technical/AGENTS.md#10-explainagent)

### Skill Category Navigation
- **Code Analysis Skills** → [Skills](docs/technical/SKILLS.md#code-analysis-skills)
- **Code Generation Skills** → [Skills](docs/technical/SKILLS.md#code-generation-skills)
- **Testing Skills** → [Skills](docs/technical/SKILLS.md#testing-skills)
- **Documentation Skills** → [Skills](docs/technical/SKILLS.md#documentation-skills)
- **Review Skills** → [Skills](docs/technical/SKILLS.md#review-skills)

## 📁 Documentation Structure

```
DevPilot/
├── README.md (this file - navigation hub)
├── docs/
│   ├── overview/
│   │   └── README.md (project overview, getting started)
│   ├── planning/
│   │   ├── PLAN.md (implementation plan)
│   │   └── PHASES.md (development phases)
│   ├── technical/
│   │   ├── ARCHITECTURE.md (system architecture)
│   │   ├── AGENTS.md (agent specifications)
│   │   └── SKILLS.md (skill definitions)
│   ├── development/
│   │   ├── DIRECTORY_STRUCTURE.md (file organization)
│   │   ├── INTEGRATION.md (integration guidelines)
│   │   └── STANDARDS.md (engineering standards)
│   └── quality/
│       └── EVALUATION.md (evaluation framework)
```

## 🔍 Search Tips

### For Finding Specific Information
1. **Start here** → Check this README for the right document
2. **Use document links** → Each document has internal navigation
3. **Check related docs** → Documents link to related information
4. **Use table of contents** → Each document has a detailed TOC

### For Common Tasks
- **"How do I implement X?"** → Check [Standards](docs/development/STANDARDS.md) and [Architecture](docs/technical/ARCHITECTURE.md)
- **"What does agent Y do?"** → Check [Agent Specs](docs/technical/AGENTS.md)
- **"How do I integrate with Z?"** → Check [Integration Guide](docs/development/INTEGRATION.md)
- **"What are the quality standards?"** → Check [Evaluation](docs/quality/EVALUATION.md)

## 🔄 Document Relationships

```
README.md (Navigation Hub)
    ↓
├── Overview → Planning → Technical → Development → Quality
│               ↓          ↓           ↓            ↓
│            Phases    Architecture  Standards   Evaluation
│                      Agents      Integration
│                      Skills    Directory
```

## 📝 Contributing to Documentation

When adding new documentation:
1. Place it in the appropriate folder (`overview/`, `planning/`, `technical/`, `development/`, `quality/`)
2. Add a link to this README for easy navigation
3. Include a "Related Documents" section at the bottom
4. Use consistent formatting and structure

## 🎓 Learning Path

For new developers or AI agents:
1. **Start** → [Overview](docs/overview/README.md) - Understand the project
2. **Plan** → [Implementation Plan](docs/planning/PLAN.md) - See the roadmap
3. **Learn** → [Architecture](docs/technical/ARCHITECTURE.md) - Understand the system
4. **Develop** → [Standards](docs/development/STANDARDS.md) - Follow coding standards
5. **Integrate** → [Integration Guide](docs/development/INTEGRATION.md) - Connect systems
6. **Quality** → [Evaluation](docs/quality/EVALUATION.md) - Ensure quality

---

**💡 Tip**: Bookmark this README as your starting point for any DevPilot documentation needs. It's designed to help you find the right information quickly, whether you're a human developer or an AI agent.

**🤖 AI Agent Tip**: Use the [Documentation Index](docs/INDEX.md) for optimized navigation with deep links and task-based document mapping.
