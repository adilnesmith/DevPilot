export const AGENT_CAPABILITIES = {
  CODE_ANALYSIS: 'code_analysis',
  BUG_DETECTION: 'bug_detection',
  TEST_GENERATION: 'test_generation',
  DOCUMENTATION: 'documentation',
  REVIEW: 'review',
  PERFORMANCE: 'performance',
  REFACTORING: 'refactoring',
  FEATURE: 'feature',
  SEARCH: 'search',
  EXPLAIN: 'explain',
  SECURITY: 'security',
  DEPLOYMENT: 'deployment',
  DATABASE: 'database',
} as const;

export const AGENT_PRIORITIES = {
  CRITICAL: 10,
  HIGH: 9,
  MEDIUM_HIGH: 8,
  MEDIUM: 7,
  MEDIUM_LOW: 6,
  LOW: 5,
} as const;
