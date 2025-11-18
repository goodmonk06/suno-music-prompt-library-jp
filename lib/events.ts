import { logger } from "./logger";

// Domain Event types
export type DomainEventType =
  | "prompt.created"
  | "prompt.updated"
  | "prompt.deleted"
  | "prompt.viewed"
  | "prompt.copied"
  | "collection.created"
  | "collection.updated"
  | "collection.deleted"
  | "collection.prompt_added"
  | "collection.prompt_removed"
  | "tag.created"
  | "tag.updated";

export interface DomainEvent<T = any> {
  type: DomainEventType;
  timestamp: Date;
  data: T;
  metadata?: {
    userId?: string;
    ip?: string;
    userAgent?: string;
    [key: string]: any;
  };
}

// Event handlers
export type EventHandler<T = any> = (event: DomainEvent<T>) => void | Promise<void>;

class EventBus {
  private handlers: Map<DomainEventType, Set<EventHandler>> = new Map();

  // Register an event handler
  on(eventType: DomainEventType, handler: EventHandler) {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, new Set());
    }
    this.handlers.get(eventType)!.add(handler);
  }

  // Unregister an event handler
  off(eventType: DomainEventType, handler: EventHandler) {
    const handlers = this.handlers.get(eventType);
    if (handlers) {
      handlers.delete(handler);
    }
  }

  // Emit an event
  async emit<T>(eventType: DomainEventType, data: T, metadata?: any) {
    const event: DomainEvent<T> = {
      type: eventType,
      timestamp: new Date(),
      data,
      metadata,
    };

    logger.info(`Event emitted: ${eventType}`, { event });

    const handlers = this.handlers.get(eventType);
    if (handlers) {
      const promises = Array.from(handlers).map(async (handler) => {
        try {
          await handler(event);
        } catch (error) {
          logger.error(`Error in event handler for ${eventType}`, error, { event });
        }
      });
      await Promise.all(promises);
    }
  }

  // Get all registered event types
  getEventTypes(): DomainEventType[] {
    return Array.from(this.handlers.keys());
  }

  // Get handler count for an event type
  getHandlerCount(eventType: DomainEventType): number {
    return this.handlers.get(eventType)?.size || 0;
  }
}

// Export singleton instance
export const eventBus = new EventBus();

// Register default handlers
eventBus.on("prompt.created", async (event) => {
  logger.info("New prompt created", { promptId: event.data.id, title: event.data.title });
});

eventBus.on("prompt.viewed", async (event) => {
  // Could track analytics here
  logger.debug("Prompt viewed", { promptId: event.data.promptId });
});

eventBus.on("prompt.copied", async (event) => {
  // Could send notifications, update stats, etc.
  logger.info("Prompt copied", { promptId: event.data.promptId });
});

eventBus.on("collection.created", async (event) => {
  logger.info("New collection created", { collectionId: event.data.id, name: event.data.name });
});

eventBus.on("collection.prompt_added", async (event) => {
  logger.info("Prompt added to collection", {
    collectionId: event.data.collectionId,
    promptId: event.data.promptId,
  });
});
