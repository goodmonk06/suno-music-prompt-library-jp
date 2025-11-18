import { describe, it, expect } from "vitest";
import { musicPromptSchema, musicPromptUpdateSchema } from "./validations";

describe("musicPromptSchema", () => {
  it("有効なプロンプトデータを受け入れる", () => {
    const validData = {
      title: "テストプロンプト",
      description: "テスト用の説明",
      mainPrompt: "lofi hip hop, chill beats",
      genre: "LoFi Hip Hop",
      bpmRange: "70-85",
      moodTags: ["リラックス", "集中"],
      usageTags: ["作業用BGM", "勉強"],
    };

    const result = musicPromptSchema.parse(validData);
    expect(result).toEqual(validData);
  });

  it("YouTube用フィールドはオプショナル", () => {
    const dataWithYouTube = {
      title: "テストプロンプト",
      description: "テスト用の説明",
      mainPrompt: "lofi hip hop",
      genre: "LoFi",
      bpmRange: "80",
      moodTags: [],
      usageTags: [],
      youtubeTitleTemplate: "【作業用BGM】テスト",
      youtubeDescriptionTemplate: "テスト用の説明文",
    };

    const result = musicPromptSchema.parse(dataWithYouTube);
    expect(result.youtubeTitleTemplate).toBe("【作業用BGM】テスト");
  });

  it("タイトルが空の場合はエラー", () => {
    const invalidData = {
      title: "",
      description: "テスト用の説明",
      mainPrompt: "lofi hip hop",
      genre: "LoFi",
      bpmRange: "80",
    };

    expect(() => musicPromptSchema.parse(invalidData)).toThrow();
  });

  it("タイトルが長すぎる場合はエラー", () => {
    const invalidData = {
      title: "a".repeat(201),
      description: "テスト用の説明",
      mainPrompt: "lofi hip hop",
      genre: "LoFi",
      bpmRange: "80",
    };

    expect(() => musicPromptSchema.parse(invalidData)).toThrow();
  });

  it("必須フィールドが欠けている場合はエラー", () => {
    const invalidData = {
      title: "テスト",
      // description が欠けている
      mainPrompt: "lofi hip hop",
      genre: "LoFi",
      bpmRange: "80",
    };

    expect(() => musicPromptSchema.parse(invalidData)).toThrow();
  });

  it("moodTags と usageTags のデフォルト値は空配列", () => {
    const data = {
      title: "テスト",
      description: "説明",
      mainPrompt: "prompt",
      genre: "genre",
      bpmRange: "80",
    };

    const result = musicPromptSchema.parse(data);
    expect(result.moodTags).toEqual([]);
    expect(result.usageTags).toEqual([]);
  });
});

describe("musicPromptUpdateSchema", () => {
  it("部分的な更新を許可する", () => {
    const partialData = {
      title: "新しいタイトル",
    };

    const result = musicPromptUpdateSchema.parse(partialData);
    expect(result.title).toBe("新しいタイトル");
  });

  it("空のオブジェクトも許可する", () => {
    const result = musicPromptUpdateSchema.parse({});
    // デフォルト値が適用されるため、moodTags と usageTags は空配列になる
    expect(result).toEqual({
      moodTags: [],
      usageTags: [],
    });
  });

  it("バリデーションルールは維持される", () => {
    const invalidData = {
      title: "a".repeat(201), // 長すぎる
    };

    expect(() => musicPromptUpdateSchema.parse(invalidData)).toThrow();
  });
});
