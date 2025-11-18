import { z } from "zod";

export const musicPromptSchema = z.object({
  title: z.string().min(1, "タイトルは必須です").max(200, "タイトルは200文字以内にしてください"),
  description: z.string().min(1, "説明は必須です").max(1000, "説明は1000文字以内にしてください"),
  mainPrompt: z.string().min(1, "メインプロンプトは必須です"),
  genre: z.string().min(1, "ジャンルは必須です").max(100, "ジャンルは100文字以内にしてください"),
  bpmRange: z.string().min(1, "BPM範囲は必須です").max(50, "BPM範囲は50文字以内にしてください"),
  moodTags: z.array(z.string()).default([]),
  usageTags: z.array(z.string()).default([]),
  youtubeTitleTemplate: z.string().max(200, "YouTubeタイトルは200文字以内にしてください").optional(),
  youtubeDescriptionTemplate: z.string().max(5000, "YouTube説明文は5000文字以内にしてください").optional(),
});

export const musicPromptUpdateSchema = musicPromptSchema.partial();

export type MusicPromptInput = z.infer<typeof musicPromptSchema>;
export type MusicPromptUpdateInput = z.infer<typeof musicPromptUpdateSchema>;
