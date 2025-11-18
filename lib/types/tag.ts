export interface Tag {
  id: string;
  name: string;
  type: string;
  description: string | null;
  usageCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TagWithStats extends Tag {
  promptCount: number;
}
