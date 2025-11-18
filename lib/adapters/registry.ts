import { INotificationAdapter, InMemoryNotificationAdapter } from "./notification";
import { IAnalyticsAdapter, InMemoryAnalyticsAdapter } from "./analytics";
import { IExportAdapter, DefaultExportAdapter } from "./export";

// Adapter registry for managing adapter instances
class AdapterRegistry {
  private notificationAdapter: INotificationAdapter;
  private analyticsAdapter: IAnalyticsAdapter;
  private exportAdapter: IExportAdapter;

  constructor() {
    // Initialize with default implementations
    this.notificationAdapter = new InMemoryNotificationAdapter();
    this.analyticsAdapter = new InMemoryAnalyticsAdapter();
    this.exportAdapter = new DefaultExportAdapter();
  }

  // Notification adapter
  setNotificationAdapter(adapter: INotificationAdapter) {
    this.notificationAdapter = adapter;
  }

  getNotificationAdapter(): INotificationAdapter {
    return this.notificationAdapter;
  }

  // Analytics adapter
  setAnalyticsAdapter(adapter: IAnalyticsAdapter) {
    this.analyticsAdapter = adapter;
  }

  getAnalyticsAdapter(): IAnalyticsAdapter {
    return this.analyticsAdapter;
  }

  // Export adapter
  setExportAdapter(adapter: IExportAdapter) {
    this.exportAdapter = adapter;
  }

  getExportAdapter(): IExportAdapter {
    return this.exportAdapter;
  }
}

// Export singleton instance
export const adapters = new AdapterRegistry();
