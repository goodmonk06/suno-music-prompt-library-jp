"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPromptPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    mainPrompt: "",
    genre: "",
    bpmRange: "",
    moodTags: "",
    usageTags: "",
    youtubeTitleTemplate: "",
    youtubeDescriptionTemplate: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/prompts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          moodTags: formData.moodTags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          usageTags: formData.usageTags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          youtubeTitleTemplate: formData.youtubeTitleTemplate || undefined,
          youtubeDescriptionTemplate:
            formData.youtubeDescriptionTemplate || undefined,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/prompts/${data.id}`);
      } else {
        alert("作成に失敗しました");
      }
    } catch (error) {
      console.error("Error creating prompt:", error);
      alert("作成に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          新規プロンプト作成
        </h1>
        <p className="text-gray-600">
          Suno向け音楽プロンプトを作成します
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border space-y-6">
          <h2 className="text-lg font-semibold border-b pb-2">基本情報</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              タイトル <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="例: 深夜の集中作業用LoFi"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              説明 <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="このプロンプトの説明や用途を記述"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              メインプロンプト <span className="text-red-500">*</span>
            </label>
            <textarea
              name="mainPrompt"
              value={formData.mainPrompt}
              onChange={handleChange}
              required
              rows={5}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              placeholder="Sunoに入力するプロンプト本文"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ジャンル <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="例: LoFi Hip Hop"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                BPM範囲 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="bpmRange"
                value={formData.bpmRange}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="例: 70-85"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ムードタグ（カンマ区切り）
              </label>
              <input
                type="text"
                name="moodTags"
                value={formData.moodTags}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="例: リラックス, 落ち着き, 集中"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                用途タグ（カンマ区切り）
              </label>
              <input
                type="text"
                name="usageTags"
                value={formData.usageTags}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="例: 作業用BGM, 勉強, 睡眠"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border space-y-6">
          <h2 className="text-lg font-semibold border-b pb-2">
            YouTube用テンプレート（オプション）
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              YouTubeタイトルテンプレート
            </label>
            <input
              type="text"
              name="youtubeTitleTemplate"
              value={formData.youtubeTitleTemplate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="例: 【作業用BGM】深夜のLoFi - 集中力UP"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              YouTube説明文テンプレート
            </label>
            <textarea
              name="youtubeDescriptionTemplate"
              value={formData.youtubeDescriptionTemplate}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="YouTube動画の説明文テンプレート"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400 font-medium"
          >
            {loading ? "作成中..." : "プロンプトを作成"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
}
