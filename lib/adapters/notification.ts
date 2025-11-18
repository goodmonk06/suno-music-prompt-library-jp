// Notification adapter interface for sending notifications
export interface INotificationAdapter {
  sendNotification(options: NotificationOptions): Promise<void>;
  sendBulkNotifications(notifications: NotificationOptions[]): Promise<void>;
}

export interface NotificationOptions {
  to: string; // email, user ID, webhook URL, etc.
  subject: string;
  body: string;
  type?: "email" | "webhook" | "push" | "sms";
  metadata?: Record<string, any>;
}

// In-memory stub implementation
export class InMemoryNotificationAdapter implements INotificationAdapter {
  private notifications: Array<{
    timestamp: Date;
    options: NotificationOptions;
  }> = [];

  async sendNotification(options: NotificationOptions): Promise<void> {
    this.notifications.push({
      timestamp: new Date(),
      options,
    });
    console.log("[InMemoryNotificationAdapter] Notification sent:", options.subject);
  }

  async sendBulkNotifications(notifications: NotificationOptions[]): Promise<void> {
    for (const notification of notifications) {
      await this.sendNotification(notification);
    }
  }

  getNotifications() {
    return this.notifications;
  }

  clear() {
    this.notifications = [];
  }
}
