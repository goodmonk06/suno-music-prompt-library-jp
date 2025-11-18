import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { collectionUpdateSchema } from "@/lib/validations/collection";
import { handleError, successResponse, ApiError } from "@/lib/api-utils";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const collection = await prisma.collection.findUnique({
      where: { id: params.id },
      include: {
        prompts: {
          include: {
            prompt: {
              select: {
                id: true,
                title: true,
                genre: true,
                description: true,
                createdAt: true,
              },
            },
          },
          orderBy: { order: "asc" },
        },
      },
    });

    if (!collection) {
      throw new ApiError(404, "コレクションが見つかりません");
    }

    return successResponse(collection);
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
    const validatedData = collectionUpdateSchema.parse(body);

    const collection = await prisma.collection.update({
      where: { id: params.id },
      data: validatedData,
    });

    return successResponse(collection);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.collection.delete({
      where: { id: params.id },
    });

    return successResponse({ success: true });
  } catch (error) {
    return handleError(error);
  }
}
