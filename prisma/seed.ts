import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  const prompts = [
    {
      title: "深夜の集中作業用 LoFi Hip Hop",
      description:
        "深夜の作業や勉強に最適なLoFi Hip Hopプロンプト。リラックスした雰囲気とノスタルジックな音色が特徴。",
      mainPrompt: `lofi hip hop, chill beats, ambient jazz, relaxing piano melodies, vinyl crackle, warm bass, soft drums,
atmospheric pads, nostalgic vibes, study music, late night mood, downtempo groove,
subtle saxophone, Rhodes electric piano, gentle guitar plucks, rain sounds in background`,
      genre: "LoFi Hip Hop",
      bpmRange: "70-85",
      moodTags: ["リラックス", "落ち着き", "ノスタルジック", "集中"],
      usageTags: ["作業用BGM", "勉強", "読書", "深夜作業", "カフェ"],
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
    {
      title: "エネルギッシュなエレクトロニックダンス",
      description:
        "ワークアウトやモチベーションアップに最適な高エネルギーEDMトラック。",
      mainPrompt: `energetic electronic dance music, powerful synths, driving bassline, intense drums, festival vibes,
euphoric melodies, uplifting progressions, anthemic drops, pumping beats, motivation energy,
electro house, big room sound, laser fx, crowd noise`,
      genre: "EDM",
      bpmRange: "128-140",
      moodTags: ["エネルギッシュ", "高揚感", "パワフル", "興奮"],
      usageTags: ["ワークアウト", "ランニング", "ドライブ", "パーティー", "モチベーション"],
      youtubeTitleTemplate: "【ワークアウト用BGM】高エネルギーEDM - モチベーションUP",
      youtubeDescriptionTemplate: `ワークアウトやモチベーションアップに最適なEDMトラック。

🎵 特徴
パワフルなシンセとドライビングなベースラインが特徴。
エネルギーを最大限に引き出します。

💪 おすすめシーン
・筋トレ、ランニング
・ドライブ、通勤
・パーティー
・やる気を出したい時

#edm #workout #motivation #energy #gym`,
    },
    {
      title: "癒しのアンビエント瞑想音楽",
      description:
        "瞑想やヨガ、睡眠導入に最適な深いリラクゼーションサウンド。",
      mainPrompt: `ambient meditation music, deep relaxation, healing sounds, ethereal pads, gentle harmonics,
nature sounds integration, soft drones, peaceful atmosphere, mindfulness support,
binaural undertones, crystal bowls, flowing water, forest ambience, zen garden`,
      genre: "Ambient",
      bpmRange: "40-60",
      moodTags: ["癒し", "平和", "瞑想的", "深いリラックス"],
      usageTags: ["瞑想", "ヨガ", "睡眠", "マインドフルネス", "スパ"],
      youtubeTitleTemplate: "【瞑想音楽】深いリラクゼーション - 癒しのアンビエント",
      youtubeDescriptionTemplate: `瞑想やヨガ、睡眠導入に最適な癒しのアンビエント音楽。

🧘 特徴
深いリラクゼーションを促す穏やかなサウンドスケープ。
マインドフルネスの実践をサポートします。

✨ おすすめシーン
・瞑想、ヨガ
・睡眠前のリラックス
・スパ、マッサージ
・ストレス解消

#meditation #ambient #yoga #healing #relaxation`,
    },
    {
      title: "アコースティックカフェジャズ",
      description:
        "おしゃれなカフェの雰囲気を演出する軽快なジャズサウンド。",
      mainPrompt: `acoustic cafe jazz, swing rhythm, upright bass, brushed drums, smooth piano chords,
warm guitar tones, sophisticated melody, elegant improvisation, coffee shop atmosphere,
bossa nova influence, light and breezy, conversational vibe, sophisticated yet casual`,
      genre: "Jazz",
      bpmRange: "100-120",
      moodTags: ["おしゃれ", "洗練", "軽快", "温かい"],
      usageTags: ["カフェBGM", "読書", "会話", "リラックス", "ブランチ"],
      youtubeTitleTemplate: "【カフェBGM】おしゃれなジャズ - 優雅なひととき",
      youtubeDescriptionTemplate: `カフェやブランチタイムにぴったりの洗練されたジャズ。

☕ 特徴
アコースティックな温かみのあるサウンド。
リラックスしながらも洗練された雰囲気を演出。

🎺 おすすめシーン
・カフェタイム
・読書、勉強
・友人との会話
・ブランチ、ディナー

#jazz #cafe #acoustic #sophisticated #relaxing`,
    },
    {
      title: "シネマティック壮大オーケストラ",
      description:
        "映画のような壮大で感動的なオーケストラサウンド。",
      mainPrompt: `cinematic epic orchestral, powerful strings, majestic brass, thunderous percussion,
emotional crescendos, heroic themes, dramatic build-ups, inspiring melodies,
film score style, adventure spirit, triumph and victory, sweeping arrangements,
timpani rolls, french horns, soaring violins`,
      genre: "Orchestral",
      bpmRange: "60-90",
      moodTags: ["壮大", "感動的", "ヒロイック", "ドラマティック"],
      usageTags: ["映像制作", "プレゼン", "モチベーション", "イベント", "トレーラー"],
      youtubeTitleTemplate: "【壮大なオーケストラ】エピック・シネマティック音楽",
      youtubeDescriptionTemplate: `映画のような壮大で感動的なオーケストラ音楽。

🎬 特徴
パワフルな弦楽器と雄大なブラスセクション。
感動的なクライマックスを演出します。

🎯 おすすめシーン
・映像制作、動画編集
・プレゼンテーション
・イベント、式典
・モチベーションアップ

#orchestral #cinematic #epic #inspiring #dramatic`,
    },
    {
      title: "チルアウト夏のトロピカルハウス",
      description:
        "夏のビーチやリゾートにぴったりの爽やかなトロピカルハウス。",
      mainPrompt: `tropical house, summer vibes, steel drums, marimba melodies, ocean waves, palm trees breeze,
chill electronic beats, warm synth pads, sunset atmosphere, beach party, vacation mood,
island rhythms, relaxed tempo, positive energy, feel-good music, summer romance`,
      genre: "Tropical House",
      bpmRange: "100-115",
      moodTags: ["爽やか", "夏", "ポジティブ", "リゾート"],
      usageTags: ["ビーチ", "ドライブ", "パーティー", "夏フェス", "旅行"],
      youtubeTitleTemplate: "【夏BGM】トロピカルハウス - ビーチリゾート気分",
      youtubeDescriptionTemplate: `夏のビーチやリゾートにぴったりの爽やかなトロピカルハウス。

🏖️ 特徴
スティールドラムとマリンバの心地よいメロディ。
夏のポジティブなエネルギーを感じられます。

🌴 おすすめシーン
・ビーチパーティー
・ドライブ、ツーリング
・夏フェス
・バケーション

#tropicalhouse #summer #beach #chillout #positive`,
    },
  ];

  for (const promptData of prompts) {
    const prompt = await prisma.musicPrompt.create({
      data: {
        ...promptData,
        moodTags: JSON.stringify(promptData.moodTags),
        usageTags: JSON.stringify(promptData.usageTags),
      },
    });
    console.log("Created prompt:", prompt.title);
  }

  console.log(`Seed completed! Created ${prompts.length} prompts.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
