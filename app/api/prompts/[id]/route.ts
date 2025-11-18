import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const prompt = await prisma.musicPrompt.findUnique({
      where: { id: params.id },
    });

    if (!prompt) {
      return NextResponse.json({ error: "Prompt not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...prompt,
      moodTags: JSON.parse(prompt.moodTags),
      usageTags: JSON.parse(prompt.usageTags),
    });
  } catch (error) {
    console.error("Error fetching prompt:", error);
    return NextResponse.json(
      { error: "Failed to fetch prompt" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      mainPrompt,
      genre,
      bpmRange,
      moodTags,
      usageTags,
      youtubeTitleTemplate,
      youtubeDescriptionTemplate,
    } = body;

    const prompt = await prisma.musicPrompt.update({
      where: { id: params.id },
      data: {
        title,
        description,
        mainPrompt,
        genre,
        bpmRange,
        moodTags: JSON.stringify(moodTags || []),
        usageTags: JSON.stringify(usageTags || []),
        youtubeTitleTemplate: youtubeTitleTemplate || null,
        youtubeDescriptionTemplate: youtubeDescriptionTemplate || null,
      },
    });

    return NextResponse.json({
      ...prompt,
      moodTags: JSON.parse(prompt.moodTags),
      usageTags: JSON.parse(prompt.usageTags),
    });
  } catch (error) {
    console.error("Error updating prompt:", error);
    return NextResponse.json(
      { error: "Failed to update prompt" },
      { status: 500 }
    );
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting prompt:", error);
    return NextResponse.json(
      { error: "Failed to delete prompt" },
      { status: 500 }
    );
  }
}
