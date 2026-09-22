import { AgentInput, AgentOutput, Tool } from '@devpilot/shared';

export interface AgentConfig {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  tools: Tool[];
  priority: number;
}

export abstract class BaseAgent {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string;
  public readonly capabilities: string[];
  public readonly tools: Tool[];
  public readonly priority: number;

  constructor(config: AgentConfig) {
    this.id = config.id;
    this.name = config.name;
    this.description = config.description;
    this.capabilities = config.capabilities;
    this.tools = config.tools;
    this.priority = config.priority;
  }

  abstract execute(input: AgentInput): Promise<AgentOutput>;

  canHandle(task: string): boolean {
    return this.capabilities.some(capability => 
      task.toLowerCase().includes(capability.toLowerCase())
    );
  }

  protected async executeTool(toolId: string, input: any): Promise<any> {
    const tool = this.tools.find(t => t.id === toolId);
    if (!tool) {
      throw new Error(`Tool ${toolId} not found`);
    }
    return await tool.execute(input);
  }
}
