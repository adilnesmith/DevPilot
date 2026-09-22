export interface MemoryEntry {
  id: string;
  content: any;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export class AgentMemory {
  private shortTermMemory: Map<string, MemoryEntry> = new Map();
  private longTermMemory: Map<string, MemoryEntry> = new Map();
  private sharedMemory: Map<string, MemoryEntry> = new Map();
  private userMemory: Map<string, Map<string, MemoryEntry>> = new Map();

  // Short-term memory (current conversation)
  setShortTerm(key: string, content: any, metadata?: Record<string, any>): void {
    this.shortTermMemory.set(key, {
      id: this.generateId(),
      content,
      timestamp: new Date(),
      metadata,
    });
  }

  getShortTerm(key: string): MemoryEntry | undefined {
    return this.shortTermMemory.get(key);
  }

  clearShortTerm(): void {
    this.shortTermMemory.clear();
  }

  // Long-term memory (persistent knowledge)
  setLongTerm(key: string, content: any, metadata?: Record<string, any>): void {
    this.longTermMemory.set(key, {
      id: this.generateId(),
      content,
      timestamp: new Date(),
      metadata,
    });
  }

  getLongTerm(key: string): MemoryEntry | undefined {
    return this.longTermMemory.get(key);
  }

  // Shared memory (cross-agent knowledge)
  setShared(key: string, content: any, metadata?: Record<string, any>): void {
    this.sharedMemory.set(key, {
      id: this.generateId(),
      content,
      timestamp: new Date(),
      metadata,
    });
  }

  getShared(key: string): MemoryEntry | undefined {
    return this.sharedMemory.get(key);
  }

  // User memory (user-specific preferences)
  setUserMemory(userId: string, key: string, content: any, metadata?: Record<string, any>): void {
    if (!this.userMemory.has(userId)) {
      this.userMemory.set(userId, new Map());
    }
    const userMem = this.userMemory.get(userId)!;
    userMem.set(key, {
      id: this.generateId(),
      content,
      timestamp: new Date(),
      metadata,
    });
  }

  getUserMemory(userId: string, key: string): MemoryEntry | undefined {
    const userMem = this.userMemory.get(userId);
    return userMem?.get(key);
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}
