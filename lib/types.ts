export interface MusicPrompt {
  id: string;
  title: string;
  description: string;
  mainPrompt: string;
  genre: string;
  bpmRange: string;
  moodTags: string[];
  usageTags: string[];
  youtubeTitleTemplate?: string | null;
  youtubeDescriptionTemplate?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface MusicPromptFormData {
  title: string;
  description: string;
  mainPrompt: string;
  genre: string;
  bpmRange: string;
  moodTags: string[];
  usageTags: string[];
  youtubeTitleTemplate?: string;
  youtubeDescriptionTemplate?: string;
}
