import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    return NextResponse.json(parsedPrompts);
  } catch (error) {
    console.error("Error fetching prompts:", error);
    return NextResponse.json(
      { error: "Failed to fetch prompts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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

    const prompt = await prisma.musicPrompt.create({
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
    console.error("Error creating prompt:", error);
    return NextResponse.json(
      { error: "Failed to create prompt" },
      { status: 500 }
    );
  }
}
