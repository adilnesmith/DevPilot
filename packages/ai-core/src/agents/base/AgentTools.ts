import { Tool } from '@devpilot/shared';

export class AgentTools {
  private tools: Map<string, Tool> = new Map();

  registerTool(tool: Tool): void {
    this.tools.set(tool.id, tool);
  }

  getTool(toolId: string): Tool | undefined {
    return this.tools.get(toolId);
  }

  getAllTools(): Tool[] {
    return Array.from(this.tools.values());
  }

  hasTool(toolId: string): boolean {
    return this.tools.has(toolId);
  }

  removeTool(toolId: string): boolean {
    return this.tools.delete(toolId);
  }
}
