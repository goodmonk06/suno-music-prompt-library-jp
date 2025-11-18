// Analytics adapter interface for sending events to external analytics platforms
export interface IAnalyticsAdapter {
  track(event: AnalyticsEvent): Promise<void>;
  identify(userId: string, traits: Record<string, any>): Promise<void>;
}

export interface AnalyticsEvent {
  event: string;
  userId?: string;
  properties?: Record<string, any>;
  timestamp?: Date;
}

// In-memory stub implementation
export class InMemoryAnalyticsAdapter implements IAnalyticsAdapter {
  private events: AnalyticsEvent[] = [];
  private users: Map<string, Record<string, any>> = new Map();

  async track(event: AnalyticsEvent): Promise<void> {
    this.events.push({
      ...event,
      timestamp: event.timestamp || new Date(),
    });
    console.log("[InMemoryAnalyticsAdapter] Event tracked:", event.event);
  }

  async identify(userId: string, traits: Record<string, any>): Promise<void> {
    const existing = this.users.get(userId) || {};
    this.users.set(userId, { ...existing, ...traits });
    console.log("[InMemoryAnalyticsAdapter] User identified:", userId);
  }

  getEvents() {
    return this.events;
  }

  getUser(userId: string) {
    return this.users.get(userId);
  }

  clear() {
    this.events = [];
    this.users.clear();
  }
}
