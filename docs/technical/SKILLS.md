# DevPilot Agent Skills

**📚 Navigation:** [← Main README](../../README.md) | [Overview](../overview/README.md) | [Agents](AGENTS.md) | [Standards](../development/STANDARDS.md)

## Overview

Skills are granular capabilities that agents can perform. While agents are high-level entities that coordinate multiple skills, skills are the atomic units of work. This document defines all skills available in the DevPilot system.

## Skill Architecture

### Skill Definition

```typescript
interface Skill {
  id: string;
  name: string;
  description: string;
  category: SkillCategory;
  inputSchema: JSONSchema;
  outputSchema: JSONSchema;
  tools: Tool[];
  complexity: 'low' | 'medium' | 'high';
  reliability: number; // 0-1
  requiresApproval: boolean;
}
```

### Skill Categories

- **Code Analysis**: Analyzing code structure and patterns
- **Code Generation**: Generating new code
- **Testing**: Creating and running tests
- **Documentation**: Creating and maintaining documentation
- **Review**: Reviewing code against standards
- **Debugging**: Finding and fixing bugs
- **Performance**: Analyzing and optimizing performance
- **Security**: Security analysis and hardening
- **Integration**: Integrating with external systems
- **Refactoring**: Improving code structure

## Core Skills

### Code Analysis Skills

#### 1. Parse Code Structure

**ID**: `skill.parse_code_structure`

**Purpose**: Parse code into abstract syntax tree (AST) and extract structure

**Input**:
```typescript
{
  code: string;
  language: string;
  filePath: string;
}
```

**Output**:
```typescript
{
  ast: object;
  functions: FunctionInfo[];
  classes: ClassInfo[];
  imports: ImportInfo[];
  exports: ExportInfo[];
  complexity: number;
}
```

**Tools**: `parse_ast`, `analyze_structure`

**Complexity**: Low

**Reliability**: 0.99

**Requires Approval**: No

---

#### 2. Trace Execution Flow

**ID**: `skill.trace_execution_flow`

**Purpose**: Trace execution flow through code to understand logic

**Input**:
```typescript
{
  code: string;
  language: string;
  entryPoint: string;
  depth: number;
}
```

**Output**:
```typescript
{
  flow: ExecutionStep[];
  branches: BranchInfo[];
  dependencies: DependencyInfo[];
  potentialPaths: string[];
}
```

**Tools**: `trace_execution`, `analyze_control_flow`

**Complexity**: Medium

**Reliability**: 0.85

**Requires Approval**: No

---

#### 3. Identify Design Patterns

**ID**: `skill.identify_patterns`

**Purpose**: Identify design patterns in code

**Input**:
```typescript
{
  code: string;
  language: string;
  patterns?: string[]; // specific patterns to look for
}
```

**Output**:
```typescript
{
  patterns: PatternMatch[];
  antiPatterns: AntiPatternMatch[];
  suggestions: PatternSuggestion[];
}
```

**Tools**: `pattern_recognition`, `code_analysis`

**Complexity**: Medium

**Reliability**: 0.80

**Requires Approval**: No

---

#### 4. Analyze Code Complexity

**ID**: `skill.analyze_complexity`

**Purpose**: Calculate code complexity metrics

**Input**:
```typescript
{
  code: string;
  language: string;
  metrics: string[]; // cyclomatic, cognitive, halstead, etc.
}
```

**Output**:
```typescript
{
  cyclomaticComplexity: number;
  cognitiveComplexity: number;
  halsteadMetrics: HalsteadMetrics;
  maintainabilityIndex: number;
  recommendations: string[];
}
```

**Tools**: `complexity_analyzer`, `metrics_calculator`

**Complexity**: Low

**Reliability**: 0.95

**Requires Approval**: No

---

### Code Generation Skills

#### 5. Generate Function Implementation

**ID**: `skill.generate_function`

**Purpose**: Generate function implementation from specification

**Input**:
```typescript
{
  specification: string;
  signature: string;
  language: string;
  context: string;
  followPatterns: boolean;
}
```

**Output**:
```typescript
{
  implementation: string;
  explanation: string;
  tests: string[];
  imports: string[];
}
```

**Tools**: `llm_generate`, `pattern_matcher`, `code_formatter`

**Complexity**: High

**Reliability**: 0.75

**Requires Approval**: Yes

---

#### 6. Generate API Endpoint

**ID**: `skill.generate_api_endpoint`

**Purpose**: Generate API endpoint implementation

**Input**:
```typescript
{
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  specification: string;
  framework: string;
  authentication: boolean;
}
```

**Output**:
```typescript
{
  implementation: string;
  validation: string;
  errorHandling: string;
  tests: string[];
  documentation: string;
}
```

**Tools**: `llm_generate`, `framework_templates`, `openapi_generator`

**Complexity**: High

**Reliability**: 0.70

**Requires Approval**: Yes

---

#### 7. Generate Component

**ID**: `skill.generate_component`

**Purpose**: Generate UI component

**Input**:
```typescript
{
  componentType: string;
  props: PropDefinition[];
  behavior: string;
  framework: 'react' | 'vue' | 'angular';
  styling: 'css' | 'scss' | 'tailwind';
}
```

**Output**:
```typescript
{
  component: string;
  styles: string;
  tests: string[];
  storybook: string;
  documentation: string;
}
```

**Tools**: `llm_generate`, `component_templates`, `prop_generator`

**Complexity**: Medium

**Reliability**: 0.80

**Requires Approval**: Yes

---

### Testing Skills

#### 8. Generate Unit Tests

**ID**: `skill.generate_unit_tests`

**Purpose**: Generate unit tests for code

**Input**:
```typescript
{
  code: string;
  language: string;
  framework: string;
  coverageTarget: number;
}
```

**Output**:
```typescript
{
  tests: TestCase[];
  mocks: MockDefinition[];
  fixtures: Fixture[];
  coverage: CoverageReport;
}
```

**Tools**: `test_generator`, `mock_generator`, `coverage_analyzer`

**Complexity**: Medium

**Reliability**: 0.85

**Requires Approval**: No

---

#### 9. Generate Integration Tests

**ID**: `skill.generate_integration_tests`

**Purpose**: Generate integration tests

**Input**:
```typescript
{
  endpoints: EndpointInfo[];
  database: DatabaseSchema;
  externalServices: ServiceInfo[];
}
```

**Output**:
```typescript
{
  tests: IntegrationTest[];
  setup: string;
  teardown: string;
  assertions: Assertion[];
}
```

**Tools**: `integration_test_generator`, `service_mocker`

**Complexity**: High

**Reliability**: 0.70

**Requires Approval**: No

---

#### 10. Identify Edge Cases

**ID**: `skill.identify_edge_cases`

**Purpose**: Identify edge cases for testing

**Input**:
```typescript
{
  code: string;
  specification: string;
  context: string;
}
```

**Output**:
```typescript
{
  edgeCases: EdgeCase[];
  boundaryConditions: BoundaryCondition[];
  errorScenarios: ErrorScenario[];
  dataVariations: DataVariation[];
}
```

**Tools**: `edge_case_analyzer`, `data_flow_analyzer`

**Complexity**: Medium

**Reliability**: 0.80

**Requires Approval**: No

---

### Documentation Skills

#### 11. Generate Code Documentation

**ID**: `skill.generate_code_docs`

**Purpose**: Generate documentation for code

**Input**:
```typescript
{
  code: string;
  language: string;
  docType: 'javadoc' | 'jsdoc' | 'godoc' | 'custom';
  includeExamples: boolean;
}
```

**Output**:
```typescript
{
  documentation: string;
  examples: Example[];
  parameters: Parameter[];
  returns: ReturnInfo[];
  throws: ExceptionInfo[];
}
```

**Tools**: `doc_generator`, `comment_extractor`, `example_generator`

**Complexity**: Low

**Reliability**: 0.90

**Requires Approval**: No

---

#### 12. Generate API Documentation

**ID**: `skill.generate_api_docs`

**Purpose**: Generate API documentation

**Input**:
```typescript
{
  endpoints: EndpointInfo[];
  authentication: AuthInfo;
  examples: boolean;
}
```

**Output**:
```typescript
{
  documentation: string;
  openapi: object;
  examples: Example[];
  schemas: Schema[];
}
```

**Tools**: `openapi_generator`, `doc_generator`, `example_generator`

**Complexity**: Medium

**Reliability**: 0.85

**Requires Approval**: No

---

#### 13. Create Architecture Diagram

**ID**: `skill.create_architecture_diagram`

**Purpose**: Create architecture diagrams

**Input**:
```typescript
{
  scope: string;
  components: ComponentInfo[];
  relationships: Relationship[];
  format: 'mermaid' | 'plantuml' | 'drawio';
}
```

**Output**:
```typescript
{
  diagram: string;
  legend: string;
  description: string;
}
```

**Tools**: `diagram_generator`, `component_analyzer`

**Complexity**: Medium

**Reliability**: 0.75

**Requires Approval**: No

---

### Review Skills

#### 14. Check Coding Standards

**ID**: `skill.check_standards`

**Purpose**: Check code against coding standards

**Input**:
```typescript
{
  code: string;
  language: string;
  standards: string[];
  strictness: 'low' | 'medium' | 'high';
}
```

**Output**:
```typescript
{
  violations: Violation[];
  score: number;
  recommendations: Recommendation[];
  autoFixable: AutoFix[];
}
```

**Tools**: `linter`, `style_checker`, `standards_validator`

**Complexity**: Low

**Reliability**: 0.95

**Requires Approval**: No

---

#### 15. Review Security

**ID**: `skill.review_security`

**Purpose**: Review code for security issues

**Input**:
```typescript
{
  code: string;
  language: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}
```

**Output**:
```typescript
{
  vulnerabilities: Vulnerability[];
  riskScore: number;
  fixes: SecurityFix[];
  bestPractices: string[];
}
```

**Tools**: `security_scanner`, `vulnerability_db`, `static_analyzer`

**Complexity**: Medium

**Reliability**: 0.85

**Requires Approval**: No

---

#### 16. Review Performance

**ID**: `skill.review_performance`

**Purpose**: Review code for performance issues

**Input**:
```typescript
{
  code: string;
  language: string;
  context: string;
}
```

**Output**:
```typescript
{
  issues: PerformanceIssue[];
  bottlenecks: Bottleneck[];
  optimizations: Optimization[];
  estimatedImpact: string;
}
```

**Tools**: `performance_analyzer`, `profiler`, `benchmark_runner`

**Complexity**: Medium

**Reliability**: 0.80

**Requires Approval**: No

---

### Debugging Skills

#### 17. Find Bugs

**ID**: `skill.find_bugs`

**Purpose**: Find potential bugs in code

**Input**:
```typescript
{
  code: string;
  language: string;
  bugTypes: string[];
  severity: string;
}
```

**Output**:
```typescript
{
  bugs: Bug[];
  falsePositives: Bug[];
  confidence: number;
  fixSuggestions: FixSuggestion[];
}
```

**Tools**: `static_analyzer`, `pattern_matcher`, `data_flow_analyzer`

**Complexity**: Medium

**Reliability**: 0.75

**Requires Approval**: No

---

#### 18. Debug Error

**ID**: `skill.debug_error`

**Purpose**: Debug specific error

**Input**:
```typescript
{
  error: string;
  stackTrace: string;
  code: string;
  context: string;
}
```

**Output**:
```typescript
{
  rootCause: string;
  explanation: string;
  fix: string;
  prevention: string;
}
```

**Tools**: `error_analyzer`, `stack_trace_parser`, `code_analyzer`

**Complexity**: High

**Reliability**: 0.70

**Requires Approval**: No

---

#### 19. Generate Fix

**ID**: `skill.generate_fix`

**Purpose**: Generate fix for identified issue

**Input**:
```typescript
{
  issue: Issue;
  code: string;
  language: string;
  safeMode: boolean;
}
```

**Output**:
```typescript
{
  fix: string;
  explanation: string;
  risk: RiskAssessment;
  tests: string[];
  sideEffects: string[];
}
```

**Tools**: `fix_generator`, `risk_analyzer`, `test_generator`

**Complexity**: High

**Reliability**: 0.65

**Requires Approval**: Yes

---

### Performance Skills

#### 20. Profile Code

**ID**: `skill.profile_code`

**Purpose**: Profile code execution

**Input**:
```typescript
{
  code: string;
  language: string;
  profileType: 'cpu' | 'memory' | 'io';
}
```

**Output**:
```typescript
{
  profile: ProfileData;
  hotspots: Hotspot[];
  bottlenecks: Bottleneck[];
  recommendations: Optimization[];
}
```

**Tools**: `profiler`, `performance_monitor`, `analyzer`

**Complexity**: Medium

**Reliability**: 0.90

**Requires Approval**: No

---

#### 21. Optimize Query

**ID**: `skill.optimize_query`

**Purpose**: Optimize database queries

**Input**:
```typescript
{
  query: string;
  database: string;
  schema: DatabaseSchema;
}
```

**Output**:
```typescript
{
  optimizedQuery: string;
  explanation: string;
  improvement: string;
  indexSuggestions: IndexSuggestion[];
}
```

**Tools**: `query_analyzer`, `index_advisor`, `explain_plan`

**Complexity**: Medium

**Reliability**: 0.85

**Requires Approval**: Yes

---

#### 22. Suggest Caching

**ID**: `skill.suggest_caching`

**Purpose**: Suggest caching strategies

**Input**:
```typescript
{
  code: string;
  dataAccessPatterns: Pattern[];
  performance: PerformanceMetrics;
}
```

**Output**:
```typescript
{
  strategies: CachingStrategy[];
  implementation: string;
  invalidation: string;
  estimatedImpact: string;
}
```

**Tools**: `cache_analyzer`, `pattern_matcher`, `performance_estimator`

**Complexity**: Medium

**Reliability**: 0.80

**Requires Approval**: No

---

### Security Skills

#### 23. Scan Vulnerabilities

**ID**: `skill.scan_vulnerabilities`

**Purpose**: Scan for security vulnerabilities

**Input**:
```typescript
{
  code: string;
  language: string;
  dependencyCheck: boolean;
}
```

**Output**:
```typescript
{
  vulnerabilities: Vulnerability[];
  severity: Severity;
  cvssScores: number[];
  fixes: Fix[];
}
```

**Tools**: `vulnerability_scanner`, `dependency_checker`, `cve_db`

**Complexity**: Medium

**Reliability**: 0.90

**Requires Approval**: No

---

#### 24. Audit Dependencies

**ID**: `skill.audit_dependencies`

**Purpose**: Audit dependencies for security issues

**Input**:
```typescript
{
  dependencies: Dependency[];
  language: string;
  depth: number;
}
```

**Output**:
```typescript
{
  vulnerableDependencies: VulnerableDependency[];
  outdatedDependencies: OutdatedDependency[];
  recommendations: Recommendation[];
}
```

**Tools**: `dependency_auditor`, `version_checker`, `advisory_db`

**Complexity**: Low

**Reliability**: 0.95

**Requires Approval**: No

---

#### 25. Generate Security Report

**ID**: `skill.generate_security_report`

**Purpose**: Generate comprehensive security report

**Input**:
```typescript
{
  codebase: string;
  scanType: 'full' | 'quick' | 'custom';
  compliance: string[];
}
```

**Output**:
```typescript
{
  report: string;
  findings: Finding[];
  score: number;
  compliance: ComplianceResult[];
  recommendations: Recommendation[];
}
```

**Tools**: `security_scanner`, `compliance_checker`, `report_generator`

**Complexity**: High

**Reliability**: 0.85

**Requires Approval**: No

---

### Integration Skills

#### 26. Integrate GitHub

**ID**: `skill.integrate_github`

**Purpose**: Integrate with GitHub API

**Input**:
```typescript
{
  operation: 'webhook' | 'api' | 'auth';
  repository: string;
  config: GitHubConfig;
}
```

**Output**:
```typescript
{
  integration: IntegrationResult;
  webhookUrl: string;
  permissions: Permission[];
  nextSteps: string[];
}
```

**Tools**: `github_api`, `webhook_manager`, `auth_handler`

**Complexity**: Medium

**Reliability**: 0.95

**Requires Approval**: Yes

---

#### 27. Integrate Jira

**ID**: `skill.integrate_jira`

**Purpose**: Integrate with Jira API

**Input**:
```typescript
{
  operation: 'webhook' | 'api' | 'auth';
  project: string;
  config: JiraConfig;
}
```

**Output**:
```typescript
{
  integration: IntegrationResult;
  webhookUrl: string;
  fieldMappings: FieldMapping[];
  nextSteps: string[];
}
```

**Tools**: `jira_api`, `webhook_manager`, `field_mapper`

**Complexity**: Medium

**Reliability**: 0.90

**Requires Approval**: Yes

---

#### 28. Setup CI/CD

**ID**: `skill.setup_cicd`

**Purpose**: Setup CI/CD pipeline

**Input**:
```typescript
{
  platform: 'github' | 'gitlab' | 'jenkins';
  language: string;
  framework: string;
  stages: string[];
}
```

**Output**:
```typescript
{
  config: string;
  scripts: Script[];
  documentation: string;
  requirements: Requirement[];
}
```

**Tools**: `cicd_generator`, `template_engine`, `platform_api`

**Complexity**: High

**Reliability**: 0.80

**Requires Approval**: Yes

---

### Refactoring Skills

#### 29. Extract Method

**ID**: `skill.extract_method`

**Purpose**: Extract method/function from code

**Input**:
```typescript
{
  code: string;
  selection: CodeSelection;
  language: string;
  name: string;
}
```

**Output**:
```typescript
{
  refactoredCode: string;
  extractedMethod: string;
  callSites: CallSite[];
  explanation: string;
}
```

**Tools**: `refactoring_engine`, `code_analyzer`, `method_extractor`

**Complexity**: Medium

**Reliability**: 0.85

**Requires Approval**: Yes

---

#### 30. Rename Symbol

**ID**: `skill.rename_symbol`

**Purpose**: Rename symbol across codebase

**Input**:
```typescript
{
  symbol: string;
  newName: string;
  scope: 'file' | 'project' | 'global';
  language: string;
}
```

**Output**:
```typescript
{
  changes: CodeChange[];
  affectedFiles: string[];
  risk: RiskAssessment;
  undoInfo: string;
}
```

**Tools**: `symbol_finder`, `refactoring_engine`, `impact_analyzer`

**Complexity**: Medium

**Reliability**: 0.90

**Requires Approval**: Yes

---

#### 31. Apply Design Pattern

**ID**: `skill.apply_pattern`

**Purpose**: Apply design pattern to code

**Input**:
```typescript
{
  code: string;
  pattern: string;
  language: string;
  context: string;
}
```

**Output**:
```typescript
{
  refactoredCode: string;
  patternImplementation: string;
  explanation: string;
  benefits: string[];
  tradeoffs: string[];
}
```

**Tools**: `pattern_engine`, `code_generator`, `refactoring_engine`

**Complexity**: High

**Reliability**: 0.70

**Requires Approval**: Yes

---

### Search Skills

#### 32. Semantic Search

**ID**: `skill.semantic_search`

**Purpose**: Search code semantically

**Input**:
```typescript
{
  query: string;
  language?: string;
  repository?: string;
  limit: number;
}
```

**Output**:
```typescript
{
  results: SearchResult[];
  summary: string;
  relatedQueries: string[];
  totalCount: number;
}
```

**Tools**: `vector_search`, `embedding_generator`, `ranker`

**Complexity**: Low

**Reliability**: 0.85

**Requires Approval**: No

---

#### 33. Find Definition

**ID**: `skill.find_definition`

**Purpose**: Find definition of symbol

**Input**:
```typescript
{
  symbol: string;
  file: string;
  language: string;
}
```

**Output**:
```typescript
{
  definition: Definition;
  references: Reference[];
  typeInfo: TypeInfo;
  documentation: string;
}
```

**Tools**: `code_indexer`, `definition_finder`, `reference_finder`

**Complexity**: Low

**Reliability**: 0.95

**Requires Approval**: No

---

#### 34. Find Usages

**ID**: `skill.find_usages`

**Purpose**: Find all usages of symbol

**Input**:
```typescript
{
  symbol: string;
  file: string;
  language: string;
  scope: 'project' | 'global';
}
```

**Output**:
```typescript
{
  usages: Usage[];
  summary: string;
  impact: ImpactAnalysis;
  refactorability: number;
}
```

**Tools**: `code_indexer`, `usage_finder`, `impact_analyzer`

**Complexity**: Low

**Reliability**: 0.95

**Requires Approval**: No

---

### Explanation Skills

#### 35. Explain Code

**ID**: `skill.explain_code`

**Purpose**: Explain code logic

**Input**:
```typescript
{
  code: string;
  language: string;
  detailLevel: 'basic' | 'intermediate' | 'advanced';
  focus?: string;
}
```

**Output**:
```typescript
{
  explanation: string;
  keyConcepts: string[];
  flow: string;
  edgeCases: string[];
  examples: Example[];
}
```

**Tools**: `code_analyzer`, `explanation_generator`, `example_generator`

**Complexity**: Medium

**Reliability**: 0.80

**Requires Approval**: No

---

#### 36. Explain Concept

**ID**: `skill.explain_concept`

**Purpose**: Explain technical concept

**Input**:
```typescript
{
  concept: string;
  context: string;
  detailLevel: 'basic' | 'intermediate' | 'advanced';
  includeExamples: boolean;
}
```

**Output**:
```typescript
{
  explanation: string;
  examples: Example[];
  resources: Resource[];
  relatedConcepts: string[];
  prerequisites: string[];
}
```

**Tools**: `concept_explainer`, `resource_finder`, `example_generator`

**Complexity**: Low

**Reliability**: 0.85

**Requires Approval**: No

---

#### 37. Explain Trade-offs

**ID**: `skill.explain_tradeoffs`

**Purpose**: Explain trade-offs of decisions

**Input**:
```typescript
{
  decision: string;
  options: Option[];
  context: string;
}
```

**Output**:
```typescript
{
  analysis: string;
  pros: string[];
  cons: string[];
  recommendation: string;
  alternatives: string[];
}
```

**Tools**: `tradeoff_analyzer`, `decision_framework`, `context_analyzer`

**Complexity**: Medium

**Reliability**: 0.75

**Requires Approval**: No

---

## Skill Composition

Skills can be composed to create complex workflows:

### Example: Code Review Workflow

```
1. skill.check_standards (Review Skills)
2. skill.review_security (Review Skills)
3. skill.review_performance (Review Skills)
4. skill.find_bugs (Debugging Skills)
5. skill.generate_fix (Debugging Skills)
```

### Example: Feature Implementation Workflow

```
1. skill.generate_function (Code Generation Skills)
2. skill.generate_api_endpoint (Code Generation Skills)
3. skill.generate_unit_tests (Testing Skills)
4. skill.generate_code_docs (Documentation Skills)
5. skill.check_standards (Review Skills)
```

## Skill Development

### Creating New Skills

To create a new skill:

1. **Define Skill Specification**: Document the skill's purpose, inputs, outputs
2. **Implement Skill Logic**: Write the skill implementation
3. **Register Skill**: Add to skill registry
4. **Write Tests**: Test skill functionality
5. **Document**: Update SKILLS.md
6. **Evaluate**: Measure skill reliability and performance

### Skill Testing

Each skill should have:
- **Unit Tests**: Test individual skill functions
- **Integration Tests**: Test tool integration
- **Quality Tests**: Test output quality
- **Performance Tests**: Test skill performance
- **Reliability Tests**: Test skill reliability over time

### Skill Monitoring

Monitor skills for:
- **Success Rate**: Percentage of successful executions
- **Quality Score**: Human-rated quality of outputs
- **Performance**: Average execution time
- **Usage**: Frequency of skill usage
- **Errors**: Common error patterns

## Skill Configuration

### Skill Parameters

Skills can be configured with parameters:
- **Strictness**: How strict the skill is
- **Detail Level**: Level of detail in outputs
- **Language**: Programming language
- **Framework**: Framework-specific behavior
- **Safe Mode**: Whether to require approval

### Skill Limits

Skills can have limits:
- **Execution Time**: Maximum execution time
- **Resource Usage**: Maximum CPU/memory usage
- **API Calls**: Maximum API calls per execution
- **Output Size**: Maximum output size

## Future Skills

Planned skills for future releases:

- **Migration Skills**: Code migration assistance
- **Localization Skills**: Internationalization support
- **Accessibility Skills**: Accessibility checking
- **Compliance Skills**: Regulatory compliance
- **Cost Skills**: Cloud cost optimization
- **Monitoring Skills**: Application monitoring setup
- **ML Skills**: Machine learning model development
- **Data Skills**: Data pipeline development

---

**📗 Related Documents:**
- [Agent Specifications](AGENTS.md) - Agent implementations that use these skills
- [Standards](../development/STANDARDS.md) - Skill development standards
- [Evaluation](../quality/EVALUATION.md) - Skill evaluation metrics
- [Architecture](ARCHITECTURE.md) - Tool and skill integration

**Document Version**: 1.0
**Last Updated**: 2026-09-14
**Next Review**: 2026-10-14
