export interface AgentInput {
  task: string;
  context?: string;
  parameters?: Record<string, any>;
}

export interface AgentOutput {
  success: boolean;
  result?: any;
  error?: string;
  metadata?: Record<string, any>;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  parameters: Record<string, any>;
  execute: (input: any) => Promise<any>;
}

export interface CodeReference {
  filePath: string;
  lineStart: number;
  lineEnd: number;
  snippet: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}
