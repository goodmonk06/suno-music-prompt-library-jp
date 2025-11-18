import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { addPromptToCollectionSchema } from "@/lib/validations/collection";
import { handleError, successResponse, ApiError } from "@/lib/api-utils";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = addPromptToCollectionSchema.parse(body);

    // Check if collection exists
    const collection = await prisma.collection.findUnique({
      where: { id: params.id },
    });

    if (!collection) {
      throw new ApiError(404, "コレクションが見つかりません");
    }

    // Check if prompt exists
    const prompt = await prisma.musicPrompt.findUnique({
      where: { id: validatedData.promptId },
    });

    if (!prompt) {
      throw new ApiError(404, "プロンプトが見つかりません");
    }

    // Check if already added
    const existing = await prisma.collectionPrompt.findUnique({
      where: {
        collectionId_promptId: {
          collectionId: params.id,
          promptId: validatedData.promptId,
        },
      },
    });

    if (existing) {
      throw new ApiError(409, "このプロンプトは既にコレクションに追加されています");
    }

    // Add prompt to collection
    const collectionPrompt = await prisma.collectionPrompt.create({
      data: {
        collectionId: params.id,
        promptId: validatedData.promptId,
        order: validatedData.order ?? 0,
      },
      include: {
        prompt: {
          select: {
            id: true,
            title: true,
            genre: true,
            createdAt: true,
          },
        },
      },
    });

    // Update collection prompt count
    await prisma.collection.update({
      where: { id: params.id },
      data: {
        promptCount: {
          increment: 1,
        },
      },
    });

    return successResponse(collectionPrompt, 201);
  } catch (error) {
    return handleError(error);
  }
}
