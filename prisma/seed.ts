import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...\n");

  // Clean existing data
  console.log("Cleaning existing data...");
  await prisma.promptUsage.deleteMany();
  await prisma.promptVersion.deleteMany();
  await prisma.promptTag.deleteMany();
  await prisma.collectionPrompt.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.musicPrompt.deleteMany();
  console.log("✓ Cleaned\n");

  // Create tags first
  console.log("Creating tags...");
  const moodTags = [
    { name: "リラックス", type: "mood", description: "落ち着いた穏やかな雰囲気" },
    { name: "エネルギッシュ", type: "mood", description: "活力に満ちた高揚感" },
    { name: "集中", type: "mood", description: "作業や学習に集中できる" },
    { name: "癒し", type: "mood", description: "心身を癒す穏やかな音楽" },
    { name: "ノスタルジック", type: "mood", description: "懐かしさを感じさせる" },
    { name: "おしゃれ", type: "mood", description: "洗練されたスタイリッシュな雰囲気" },
    { name: "壮大", type: "mood", description: "スケールの大きなドラマティックな印象" },
    { name: "爽やか", type: "mood", description: "清々しく明るい気分" },
  ];

  const usageTags = [
    { name: "作業用BGM", type: "usage", description: "仕事や作業中のバックグラウンドに" },
    { name: "勉強", type: "usage", description: "学習や読書のサポートに" },
    { name: "ワークアウト", type: "usage", description: "運動やトレーニングのモチベーションに" },
    { name: "瞑想", type: "usage", description: "瞑想やマインドフルネスの実践に" },
    { name: "カフェBGM", type: "usage", description: "カフェやリラックス空間の演出に" },
    { name: "映像制作", type: "usage", description: "動画や映像コンテンツのBGMとして" },
    { name: "睡眠", type: "usage", description: "就寝前のリラクゼーションに" },
    { name: "ドライブ", type: "usage", description: "ドライブや移動中のBGMに" },
  ];

  const allTags = [...moodTags, ...usageTags];
  const tagMap: Record<string, any> = {};

  for (const tagData of allTags) {
    const tag = await prisma.tag.create({ data: tagData });
    tagMap[tag.name] = tag;
    console.log(`  ✓ Tag: ${tag.name} (${tag.type})`);
  }
  console.log(`\n✓ Created ${allTags.length} tags\n`);

  // Create music prompts
  console.log("Creating music prompts...");
  const promptsData = [
    {
      title: "深夜の集中作業用 LoFi Hip Hop",
      description:
        "深夜の作業や勉強に最適なLoFi Hip Hopプロンプト。リラックスした雰囲気とノスタルジックな音色が特徴。",
      mainPrompt: `lofi hip hop, chill beats, ambient jazz, relaxing piano melodies, vinyl crackle, warm bass, soft drums,
atmospheric pads, nostalgic vibes, study music, late night mood, downtempo groove,
subtle saxophone, Rhodes electric piano, gentle guitar plucks, rain sounds in background`,
      genre: "LoFi Hip Hop",
      bpmRange: "70-85",
      moodTags: ["リラックス", "ノスタルジック", "集中"],
      usageTags: ["作業用BGM", "勉強"],
      status: "published",
      viewCount: 125,
      copyCount: 45,
      youtubeTitleTemplate:
        "【作業用BGM】深夜のLoFi Hip Hop - 集中力UP / Chill Beats for Late Night Study",
      youtubeDescriptionTemplate: `深夜の作業や勉強に最適なLoFi Hip Hopプレイリスト。\n\n🎵 このプロンプトについて\nリラックスした雰囲気とノスタルジックな音色が特徴のLoFi Hip Hop。\n集中力を高め、クリエイティブな作業をサポートします。`,
    },
    {
      title: "エネルギッシュなエレクトロニックダンス",
      description:
        "ワークアウトやモチベーションアップに最適な高エネルギーEDMトラック。",
      mainPrompt: `energetic electronic dance music, powerful synths, driving bassline, intense drums, festival vibes,
euphoric melodies, uplifting progressions, anthemic drops, pumping beats, motivation energy`,
      genre: "EDM",
      bpmRange: "128-140",
      moodTags: ["エネルギッシュ"],
      usageTags: ["ワークアウト"],
      status: "published",
      viewCount: 89,
      copyCount: 32,
      youtubeTitleTemplate: "【ワークアウト用BGM】高エネルギーEDM - モチベーションUP",
    },
    {
      title: "癒しのアンビエント瞑想音楽",
      description:
        "瞑想やヨガ、睡眠導入に最適な深いリラクゼーションサウンド。",
      mainPrompt: `ambient meditation music, deep relaxation, healing sounds, ethereal pads, gentle harmonics,
nature sounds integration, soft drones, peaceful atmosphere, mindfulness support`,
      genre: "Ambient",
      bpmRange: "40-60",
      moodTags: ["癒し"],
      usageTags: ["瞑想", "睡眠"],
      status: "published",
      viewCount: 156,
      copyCount: 67,
    },
    {
      title: "アコースティックカフェジャズ",
      description:
        "おしゃれなカフェの雰囲気を演出する軽快なジャズサウンド。",
      mainPrompt: `acoustic cafe jazz, swing rhythm, upright bass, brushed drums, smooth piano chords,
warm guitar tones, sophisticated melody, elegant improvisation, coffee shop atmosphere`,
      genre: "Jazz",
      bpmRange: "100-120",
      moodTags: ["おしゃれ", "リラックス"],
      usageTags: ["カフェBGM"],
      status: "published",
      viewCount: 203,
      copyCount: 78,
    },
    {
      title: "シネマティック壮大オーケストラ",
      description:
        "映画のような壮大で感動的なオーケストラサウンド。",
      mainPrompt: `cinematic epic orchestral, powerful strings, majestic brass, thunderous percussion,
emotional crescendos, heroic themes, dramatic build-ups, inspiring melodies`,
      genre: "Orchestral",
      bpmRange: "60-90",
      moodTags: ["壮大"],
      usageTags: ["映像制作"],
      status: "published",
      viewCount: 178,
      copyCount: 91,
    },
    {
      title: "チルアウト夏のトロピカルハウス",
      description:
        "夏のビーチやリゾートにぴったりの爽やかなトロピカルハウス。",
      mainPrompt: `tropical house, summer vibes, steel drums, marimba melodies, ocean waves, palm trees breeze,
chill electronic beats, warm synth pads, sunset atmosphere, beach party, vacation mood`,
      genre: "Tropical House",
      bpmRange: "100-115",
      moodTags: ["爽やか"],
      usageTags: ["ドライブ"],
      status: "published",
      viewCount: 142,
      copyCount: 53,
    },
    {
      title: "モダンR&Bビート",
      description:
        "洗練されたモダンR&Bのビート。ナイトドライブやリラックスタイムに。",
      mainPrompt: `modern r&b, smooth vocals style, trap-influenced drums, lush chords, neo-soul elements,
contemporary production, late night vibes, sophisticated bass, vocal harmonies backdrop`,
      genre: "R&B",
      bpmRange: "85-95",
      moodTags: ["おしゃれ", "リラックス"],
      usageTags: ["ドライブ", "作業用BGM"],
      status: "draft",
      viewCount: 12,
      copyCount: 3,
    },
    {
      title: "アコースティックフォークバラード",
      description:
        "温かみのあるアコースティックギターとシンプルなメロディ。",
      mainPrompt: `acoustic folk ballad, fingerstyle guitar, warm vocals style, simple melody, storytelling mood,
intimate atmosphere, natural reverb, wooden instruments, campfire vibe`,
      genre: "Folk",
      bpmRange: "70-80",
      moodTags: ["リラックス", "ノスタルジック"],
      usageTags: ["カフェBGM"],
      status: "published",
      viewCount: 67,
      copyCount: 23,
    },
  ];

  const prompts: any[] = [];
  for (const promptData of promptsData) {
    const prompt = await prisma.musicPrompt.create({
      data: {
        title: promptData.title,
        description: promptData.description,
        mainPrompt: promptData.mainPrompt,
        genre: promptData.genre,
        bpmRange: promptData.bpmRange,
        moodTags: JSON.stringify(promptData.moodTags),
        usageTags: JSON.stringify(promptData.usageTags),
        status: promptData.status,
        viewCount: promptData.viewCount,
        copyCount: promptData.copyCount,
        youtubeTitleTemplate: promptData.youtubeTitleTemplate,
        youtubeDescriptionTemplate: promptData.youtubeDescriptionTemplate,
      },
    });

    // Associate tags
    for (const moodTagName of promptData.moodTags) {
      const tag = tagMap[moodTagName];
      if (tag) {
        await prisma.promptTag.create({
          data: {
            promptId: prompt.id,
            tagId: tag.id,
          },
        });
        await prisma.tag.update({
          where: { id: tag.id },
          data: { usageCount: { increment: 1 } },
        });
      }
    }

    for (const usageTagName of promptData.usageTags) {
      const tag = tagMap[usageTagName];
      if (tag) {
        await prisma.promptTag.create({
          data: {
            promptId: prompt.id,
            tagId: tag.id,
          },
        });
        await prisma.tag.update({
          where: { id: tag.id },
          data: { usageCount: { increment: 1 } },
        });
      }
    }

    prompts.push(prompt);
    console.log(`  ✓ Prompt: ${prompt.title}`);
  }
  console.log(`\n✓ Created ${prompts.length} prompts\n`);

  // Create collections
  console.log("Creating collections...");
  const collections = [
    {
      name: "作業・勉強用BGM",
      description: "集中力を高める作業用・勉強用の音楽プロンプト集",
      visibility: "public",
      promptIndexes: [0, 3, 7], // LoFi, Jazz, Folk
    },
    {
      name: "リラクゼーション",
      description: "心を落ち着けるリラックス用音楽",
      visibility: "public",
      promptIndexes: [2, 3], // Ambient, Jazz
    },
    {
      name: "エネルギッシュな音楽",
      description: "モチベーションを上げる元気な音楽",
      visibility: "public",
      promptIndexes: [1, 5], // EDM, Tropical
    },
    {
      name: "クリエイター向けBGM",
      description: "映像制作やコンテンツ作成用のBGM",
      visibility: "unlisted",
      promptIndexes: [4], // Orchestral
    },
  ];

  for (const collData of collections) {
    const collection = await prisma.collection.create({
      data: {
        name: collData.name,
        description: collData.description,
        visibility: collData.visibility,
        promptCount: collData.promptIndexes.length,
      },
    });

    for (let i = 0; i < collData.promptIndexes.length; i++) {
      const promptIndex = collData.promptIndexes[i];
      await prisma.collectionPrompt.create({
        data: {
          collectionId: collection.id,
          promptId: prompts[promptIndex].id,
          order: i,
        },
      });
    }

    console.log(`  ✓ Collection: ${collection.name} (${collection.promptCount} prompts)`);
  }
  console.log(`\n✓ Created ${collections.length} collections\n`);

  // Create prompt versions for first prompt
  console.log("Creating prompt versions...");
  const firstPrompt = prompts[0];
  await prisma.promptVersion.create({
    data: {
      promptId: firstPrompt.id,
      version: 1,
      title: firstPrompt.title,
      description: "初期バージョン",
      mainPrompt: "lofi hip hop, chill beats, relaxing atmosphere",
      genre: firstPrompt.genre,
      bpmRange: firstPrompt.bpmRange,
      moodTags: firstPrompt.moodTags,
      usageTags: firstPrompt.usageTags,
      changeNote: "初期作成",
    },
  });

  await prisma.promptVersion.create({
    data: {
      promptId: firstPrompt.id,
      version: 2,
      title: firstPrompt.title,
      description: firstPrompt.description,
      mainPrompt: firstPrompt.mainPrompt,
      genre: firstPrompt.genre,
      bpmRange: firstPrompt.bpmRange,
      moodTags: firstPrompt.moodTags,
      usageTags: firstPrompt.usageTags,
      changeNote: "より詳細なプロンプトに改善",
    },
  });
  console.log(`  ✓ Created 2 versions for: ${firstPrompt.title}\n`);

  // Create usage records
  console.log("Creating usage records...");
  let usageCount = 0;
  for (const prompt of prompts.slice(0, 5)) {
    // Create view records
    for (let i = 0; i < Math.floor(Math.random() * 20) + 10; i++) {
      await prisma.promptUsage.create({
        data: {
          promptId: prompt.id,
          action: "view",
          timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Last 7 days
        },
      });
      usageCount++;
    }

    // Create copy records
    for (let i = 0; i < Math.floor(Math.random() * 10) + 5; i++) {
      await prisma.promptUsage.create({
        data: {
          promptId: prompt.id,
          action: "copy",
          timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        },
      });
      usageCount++;
    }
  }
  console.log(`  ✓ Created ${usageCount} usage records\n`);

  console.log("✅ Seed completed!\n");
  console.log("Summary:");
  console.log(`  - ${allTags.length} tags`);
  console.log(`  - ${prompts.length} music prompts`);
  console.log(`  - ${collections.length} collections`);
  console.log(`  - 2 prompt versions`);
  console.log(`  - ${usageCount} usage records`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
