// Export adapter interface for exporting data in various formats
export interface IExportAdapter {
  export(data: any, format: ExportFormat): Promise<ExportResult>;
}

export type ExportFormat = "json" | "csv" | "markdown" | "yaml";

export interface ExportResult {
  format: ExportFormat;
  content: string;
  filename: string;
  mimeType: string;
}

// Default implementation
export class DefaultExportAdapter implements IExportAdapter {
  async export(data: any, format: ExportFormat): Promise<ExportResult> {
    switch (format) {
      case "json":
        return this.exportJSON(data);
      case "csv":
        return this.exportCSV(data);
      case "markdown":
        return this.exportMarkdown(data);
      case "yaml":
        return this.exportYAML(data);
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }

  private async exportJSON(data: any): Promise<ExportResult> {
    return {
      format: "json",
      content: JSON.stringify(data, null, 2),
      filename: `export-${Date.now()}.json`,
      mimeType: "application/json",
    };
  }

  private async exportCSV(data: any): Promise<ExportResult> {
    // Simple CSV export - assumes data is array of objects
    const items = Array.isArray(data) ? data : [data];
    if (items.length === 0) {
      return {
        format: "csv",
        content: "",
        filename: `export-${Date.now()}.csv`,
        mimeType: "text/csv",
      };
    }

    const headers = Object.keys(items[0]);
    const csvRows = [headers.join(",")];

    for (const item of items) {
      const row = headers.map((header) => {
        const value = item[header];
        const stringValue = value !== null && value !== undefined ? String(value) : "";
        // Escape commas and quotes
        return stringValue.includes(",") || stringValue.includes('"')
          ? `"${stringValue.replace(/"/g, '""')}"`
          : stringValue;
      });
      csvRows.push(row.join(","));
    }

    return {
      format: "csv",
      content: csvRows.join("\n"),
      filename: `export-${Date.now()}.csv`,
      mimeType: "text/csv",
    };
  }

  private async exportMarkdown(data: any): Promise<ExportResult> {
    // Simple markdown export
    const items = Array.isArray(data) ? data : [data];
    let markdown = "";

    for (const item of items) {
      if (item.title) {
        markdown += `# ${item.title}\n\n`;
      }
      if (item.description) {
        markdown += `${item.description}\n\n`;
      }
      markdown += "```\n";
      markdown += JSON.stringify(item, null, 2);
      markdown += "\n```\n\n";
      markdown += "---\n\n";
    }

    return {
      format: "markdown",
      content: markdown,
      filename: `export-${Date.now()}.md`,
      mimeType: "text/markdown",
    };
  }

  private async exportYAML(data: any): Promise<ExportResult> {
    // Basic YAML export (without external library)
    const yamlContent = this.toYAML(data);
    return {
      format: "yaml",
      content: yamlContent,
      filename: `export-${Date.now()}.yaml`,
      mimeType: "text/yaml",
    };
  }

  private toYAML(obj: any, indent: number = 0): string {
    const spaces = " ".repeat(indent);
    if (Array.isArray(obj)) {
      return obj.map((item) => `${spaces}- ${this.toYAML(item, indent + 2)}`).join("\n");
    } else if (typeof obj === "object" && obj !== null) {
      return Object.entries(obj)
        .map(([key, value]) => {
          if (typeof value === "object" && value !== null) {
            return `${spaces}${key}:\n${this.toYAML(value, indent + 2)}`;
          }
          return `${spaces}${key}: ${value}`;
        })
        .join("\n");
    }
    return String(obj);
  }
}
