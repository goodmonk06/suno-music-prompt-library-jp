import { z } from "zod";

export const tagSchema = z.object({
  name: z.string().min(1, "名前は必須です").max(50, "名前は50文字以内にしてください"),
  type: z.enum(["mood", "usage", "genre", "custom"]),
  description: z.string().max(500, "説明は500文字以内にしてください").optional(),
});

export const tagUpdateSchema = tagSchema.partial();

export type TagInput = z.infer<typeof tagSchema>;
export type TagUpdateInput = z.infer<typeof tagUpdateSchema>;
