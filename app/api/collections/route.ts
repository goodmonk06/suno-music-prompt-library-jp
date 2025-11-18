import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { collectionSchema } from "@/lib/validations/collection";
import { handleError, successResponse } from "@/lib/api-utils";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const visibility = searchParams.get("visibility");

    const where: any = {};
    if (visibility) where.visibility = visibility;

    const collections = await prisma.collection.findMany({
      where,
      include: {
        _count: {
          select: { prompts: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Update promptCount to match actual count
    const collectionsWithCount = collections.map((collection) => ({
      ...collection,
      promptCount: collection._count.prompts,
      _count: undefined,
    }));

    return successResponse(collectionsWithCount);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = collectionSchema.parse(body);

    const collection = await prisma.collection.create({
      data: validatedData,
    });

    return successResponse(collection, 201);
  } catch (error) {
    return handleError(error);
  }
}
