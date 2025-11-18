interface MetricLabels {
  [key: string]: string | number;
}

interface Counter {
  name: string;
  value: number;
  labels: MetricLabels;
  timestamp: Date;
}

interface Histogram {
  name: string;
  value: number;
  labels: MetricLabels;
  timestamp: Date;
}

class MetricsCollector {
  private counters: Map<string, Counter> = new Map();
  private histograms: Histogram[] = [];

  // Record a counter metric
  recordCounter(name: string, labels: MetricLabels = {}, value: number = 1) {
    const key = this.getMetricKey(name, labels);
    const existing = this.counters.get(key);

    if (existing) {
      existing.value += value;
      existing.timestamp = new Date();
    } else {
      this.counters.set(key, {
        name,
        value,
        labels,
        timestamp: new Date(),
      });
    }
  }

  // Record a histogram metric (for durations, sizes, etc.)
  recordHistogram(name: string, value: number, labels: MetricLabels = {}) {
    this.histograms.push({
      name,
      value,
      labels,
      timestamp: new Date(),
    });

    // Keep only last 1000 histogram entries
    if (this.histograms.length > 1000) {
      this.histograms.shift();
    }
  }

  // Measure execution time of a function
  async measure<T>(
    name: string,
    fn: () => Promise<T>,
    labels: MetricLabels = {}
  ): Promise<T> {
    const start = Date.now();
    try {
      const result = await fn();
      const duration = Date.now() - start;
      this.recordHistogram(`${name}_duration_ms`, duration, labels);
      this.recordCounter(`${name}_total`, labels);
      this.recordCounter(`${name}_success`, labels);
      return result;
    } catch (error) {
      const duration = Date.now() - start;
      this.recordHistogram(`${name}_duration_ms`, duration, labels);
      this.recordCounter(`${name}_total`, labels);
      this.recordCounter(`${name}_error`, labels);
      throw error;
    }
  }

  // Get all metrics
  getMetrics() {
    return {
      counters: Array.from(this.counters.values()),
      histograms: this.histograms.slice(-100), // Return last 100 histogram entries
    };
  }

  // Get metrics summary
  getSummary() {
    const counterSummary: Record<string, number> = {};
    for (const [key, counter] of this.counters) {
      counterSummary[key] = counter.value;
    }

    const histogramSummary: Record<string, { count: number; avg: number; min: number; max: number }> = {};
    const histogramGroups = new Map<string, number[]>();

    for (const hist of this.histograms) {
      const key = this.getMetricKey(hist.name, hist.labels);
      if (!histogramGroups.has(key)) {
        histogramGroups.set(key, []);
      }
      histogramGroups.get(key)!.push(hist.value);
    }

    for (const [key, values] of histogramGroups) {
      const count = values.length;
      const sum = values.reduce((a, b) => a + b, 0);
      const avg = sum / count;
      const min = Math.min(...values);
      const max = Math.max(...values);
      histogramSummary[key] = { count, avg, min, max };
    }

    return {
      counters: counterSummary,
      histograms: histogramSummary,
    };
  }

  // Reset all metrics
  reset() {
    this.counters.clear();
    this.histograms = [];
  }

  private getMetricKey(name: string, labels: MetricLabels): string {
    const labelStr = Object.entries(labels)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join(",");
    return labelStr ? `${name}{${labelStr}}` : name;
  }
}

// Export singleton instance
export const metrics = new MetricsCollector();

// Business metrics helpers
export const businessMetrics = {
  promptCreated: (genre: string) => {
    metrics.recordCounter("prompt_created", { genre });
  },

  promptViewed: (promptId: string) => {
    metrics.recordCounter("prompt_viewed", { promptId });
  },

  promptCopied: (promptId: string) => {
    metrics.recordCounter("prompt_copied", { promptId });
  },

  collectionCreated: () => {
    metrics.recordCounter("collection_created");
  },

  collectionPromptAdded: (collectionId: string) => {
    metrics.recordCounter("collection_prompt_added", { collectionId });
  },
};
