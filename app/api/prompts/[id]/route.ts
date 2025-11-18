import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { musicPromptUpdateSchema } from "@/lib/validations";
import { handleError, successResponse, ApiError } from "@/lib/api-utils";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const prompt = await prisma.musicPrompt.findUnique({
      where: { id: params.id },
    });

    if (!prompt) {
      throw new ApiError(404, "プロンプトが見つかりません");
    }

    return successResponse({
      ...prompt,
      moodTags: JSON.parse(prompt.moodTags),
      usageTags: JSON.parse(prompt.usageTags),
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    // バリデーション
    const validatedData = musicPromptUpdateSchema.parse(body);

    const updateData: any = {};
    if (validatedData.title !== undefined) updateData.title = validatedData.title;
    if (validatedData.description !== undefined) updateData.description = validatedData.description;
    if (validatedData.mainPrompt !== undefined) updateData.mainPrompt = validatedData.mainPrompt;
    if (validatedData.genre !== undefined) updateData.genre = validatedData.genre;
    if (validatedData.bpmRange !== undefined) updateData.bpmRange = validatedData.bpmRange;
    if (validatedData.moodTags !== undefined) updateData.moodTags = JSON.stringify(validatedData.moodTags);
    if (validatedData.usageTags !== undefined) updateData.usageTags = JSON.stringify(validatedData.usageTags);
    if (validatedData.youtubeTitleTemplate !== undefined) updateData.youtubeTitleTemplate = validatedData.youtubeTitleTemplate || null;
    if (validatedData.youtubeDescriptionTemplate !== undefined) updateData.youtubeDescriptionTemplate = validatedData.youtubeDescriptionTemplate || null;

    const prompt = await prisma.musicPrompt.update({
      where: { id: params.id },
      data: updateData,
    });

    return successResponse({
      ...prompt,
      moodTags: JSON.parse(prompt.moodTags),
      usageTags: JSON.parse(prompt.usageTags),
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.musicPrompt.delete({
      where: { id: params.id },
    });

    return successResponse({ success: true });
  } catch (error) {
    return handleError(error);
  }
}
