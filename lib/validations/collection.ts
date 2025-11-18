import { z } from "zod";

export const collectionSchema = z.object({
  name: z.string().min(1, "名前は必須です").max(100, "名前は100文字以内にしてください"),
  description: z.string().max(1000, "説明は1000文字以内にしてください").optional(),
  visibility: z.enum(["private", "unlisted", "public"]).default("private"),
});

export const collectionUpdateSchema = collectionSchema.partial();

export const addPromptToCollectionSchema = z.object({
  promptId: z.string().min(1, "プロンプトIDは必須です"),
  order: z.number().int().min(0).optional(),
});

export type CollectionInput = z.infer<typeof collectionSchema>;
export type CollectionUpdateInput = z.infer<typeof collectionUpdateSchema>;
export type AddPromptToCollectionInput = z.infer<typeof addPromptToCollectionSchema>;
