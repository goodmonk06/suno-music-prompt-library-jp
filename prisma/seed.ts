import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // LoFi BGMサンプルプロンプト
  const lofiPrompt = await prisma.musicPrompt.create({
    data: {
      title: "深夜の集中作業用 LoFi Hip Hop",
      description:
        "深夜の作業や勉強に最適なLoFi Hip Hopプロンプト。リラックスした雰囲気とノスタルジックな音色が特徴。",
      mainPrompt: `lofi hip hop, chill beats, ambient jazz, relaxing piano melodies, vinyl crackle, warm bass, soft drums,
atmospheric pads, nostalgic vibes, study music, late night mood, downtempo groove,
subtle saxophone, Rhodes electric piano, gentle guitar plucks, rain sounds in background`,
      genre: "LoFi Hip Hop",
      bpmRange: "70-85",
      moodTags: JSON.stringify([
        "リラックス",
        "落ち着き",
        "ノスタルジック",
        "集中",
      ]),
      usageTags: JSON.stringify([
        "作業用BGM",
        "勉強",
        "読書",
        "深夜作業",
        "カフェ",
      ]),
      youtubeTitleTemplate:
        "【作業用BGM】深夜のLoFi Hip Hop - 集中力UP / Chill Beats for Late Night Study",
      youtubeDescriptionTemplate: `深夜の作業や勉強に最適なLoFi Hip Hopプレイリスト。

🎵 このプロンプトについて
リラックスした雰囲気とノスタルジックな音色が特徴のLoFi Hip Hop。
集中力を高め、クリエイティブな作業をサポートします。

⏰ おすすめの使用シーン
・深夜の作業、勉強
・読書タイム
・カフェでのリラックスタイム
・プログラミング、ライティング

#lofi #chillbeats #studymusic #作業用bgm #集中`,
    },
  });

  console.log("Created sample prompt:", lofiPrompt.title);
  console.log("Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
