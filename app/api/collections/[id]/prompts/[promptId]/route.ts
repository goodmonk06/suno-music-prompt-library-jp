import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleError, successResponse, ApiError } from "@/lib/api-utils";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; promptId: string } }
) {
  try {
    const collectionPrompt = await prisma.collectionPrompt.findUnique({
      where: {
        collectionId_promptId: {
          collectionId: params.id,
          promptId: params.promptId,
        },
      },
    });

    if (!collectionPrompt) {
      throw new ApiError(404, "プロンプトがコレクションに見つかりません");
    }

    await prisma.collectionPrompt.delete({
      where: {
        collectionId_promptId: {
          collectionId: params.id,
          promptId: params.promptId,
        },
      },
    });

    // Update collection prompt count
    await prisma.collection.update({
      where: { id: params.id },
      data: {
        promptCount: {
          decrement: 1,
        },
      },
    });

    return successResponse({ success: true });
  } catch (error) {
    return handleError(error);
  }
}
