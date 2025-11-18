import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { musicPromptSchema } from "@/lib/validations";
import { handleError, successResponse } from "@/lib/api-utils";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const genre = searchParams.get("genre");
    const mood = searchParams.get("mood");
    const usage = searchParams.get("usage");

    const where: any = {};
    if (genre) where.genre = genre;
    if (mood) where.moodTags = { contains: mood };
    if (usage) where.usageTags = { contains: usage };

    const prompts = await prisma.musicPrompt.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    // JSONフィールドをパース
    const parsedPrompts = prompts.map((prompt) => ({
      ...prompt,
      moodTags: JSON.parse(prompt.moodTags),
      usageTags: JSON.parse(prompt.usageTags),
    }));

    return successResponse(parsedPrompts);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // バリデーション
    const validatedData = musicPromptSchema.parse(body);

    const prompt = await prisma.musicPrompt.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        mainPrompt: validatedData.mainPrompt,
        genre: validatedData.genre,
        bpmRange: validatedData.bpmRange,
        moodTags: JSON.stringify(validatedData.moodTags),
        usageTags: JSON.stringify(validatedData.usageTags),
        youtubeTitleTemplate: validatedData.youtubeTitleTemplate || null,
        youtubeDescriptionTemplate: validatedData.youtubeDescriptionTemplate || null,
      },
    });

    return successResponse(
      {
        ...prompt,
        moodTags: JSON.parse(prompt.moodTags),
        usageTags: JSON.parse(prompt.usageTags),
      },
      201
    );
  } catch (error) {
    return handleError(error);
  }
}
