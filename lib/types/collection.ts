export interface Collection {
  id: string;
  name: string;
  description: string | null;
  visibility: string;
  userId: string | null;
  promptCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CollectionWithPrompts extends Collection {
  prompts: CollectionPromptDetail[];
}

export interface CollectionPromptDetail {
  id: string;
  promptId: string;
  order: number;
  addedAt: Date;
  prompt: {
    id: string;
    title: string;
    genre: string;
    createdAt: Date;
  };
}
