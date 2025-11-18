type LogLevel = "debug" | "info" | "warn" | "error";

interface LogContext {
  [key: string]: any;
}

class Logger {
  private context: LogContext = {};

  setContext(context: LogContext) {
    this.context = { ...this.context, ...context };
  }

  private log(level: LogLevel, message: string, meta?: LogContext) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      ...this.context,
      ...meta,
    };

    // In development, use console methods directly
    if (process.env.NODE_ENV === "development") {
      const consoleMethod = level === "debug" ? "log" : level;
      console[consoleMethod](
        `[${timestamp}] [${level.toUpperCase()}]`,
        message,
        meta || ""
      );
    } else {
      // In production, log as JSON for structured logging
      console.log(JSON.stringify(logEntry));
    }
  }

  debug(message: string, meta?: LogContext) {
    this.log("debug", message, meta);
  }

  info(message: string, meta?: LogContext) {
    this.log("info", message, meta);
  }

  warn(message: string, meta?: LogContext) {
    this.log("warn", message, meta);
  }

  error(message: string, error?: Error | unknown, meta?: LogContext) {
    const errorMeta = error instanceof Error
      ? {
          error: {
            message: error.message,
            stack: error.stack,
            name: error.name,
          },
        }
      : { error };

    this.log("error", message, { ...errorMeta, ...meta });
  }

  child(context: LogContext): Logger {
    const childLogger = new Logger();
    childLogger.context = { ...this.context, ...context };
    return childLogger;
  }
}

// Export singleton instance
export const logger = new Logger();

// Export class for creating child loggers
export { Logger };
