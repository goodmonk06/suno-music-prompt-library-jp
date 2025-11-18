"use client";

import { useEffect, useState } from "react";
import { MusicPrompt } from "@/lib/types";
import Link from "next/link";

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<MusicPrompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [genreFilter, setGenreFilter] = useState("");
  const [moodFilter, setMoodFilter] = useState("");
  const [usageFilter, setUsageFilter] = useState("");

  useEffect(() => {
    fetchPrompts();
  }, [genreFilter, moodFilter, usageFilter]);

  const fetchPrompts = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (genreFilter) params.append("genre", genreFilter);
    if (moodFilter) params.append("mood", moodFilter);
    if (usageFilter) params.append("usage", usageFilter);

    const response = await fetch(`/api/prompts?${params.toString()}`);
    const data = await response.json();
    setPrompts(data);
    setLoading(false);
  };

  const allGenres = Array.from(new Set(prompts.map((p) => p.genre)));
  const allMoods = Array.from(
    new Set(prompts.flatMap((p) => p.moodTags))
  ).filter(Boolean);
  const allUsages = Array.from(
    new Set(prompts.flatMap((p) => p.usageTags))
  ).filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          プロンプト一覧
        </h1>
        <p className="text-gray-600">Suno向け音楽プロンプトライブラリ</p>
      </div>

      {/* フィルター */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <h2 className="text-lg font-semibold mb-4">フィルター</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ジャンル
            </label>
            <select
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">すべて</option>
              {allGenres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ムード
            </label>
            <select
              value={moodFilter}
              onChange={(e) => setMoodFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">すべて</option>
              {allMoods.map((mood) => (
                <option key={mood} value={mood}>
                  {mood}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              用途
            </label>
            <select
              value={usageFilter}
              onChange={(e) => setUsageFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">すべて</option>
              {allUsages.map((usage) => (
                <option key={usage} value={usage}>
                  {usage}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* プロンプトリスト */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">読み込み中...</p>
        </div>
      ) : prompts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border">
          <p className="text-gray-600 mb-4">プロンプトがありません</p>
          <Link
            href="/prompts/new"
            className="text-blue-600 hover:text-blue-700"
          >
            最初のプロンプトを作成
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.map((prompt) => (
            <Link
              key={prompt.id}
              href={`/prompts/${prompt.id}`}
              className="block bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {prompt.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {prompt.description}
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-500">
                    ジャンル:
                  </span>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {prompt.genre}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-500">
                    BPM:
                  </span>
                  <span className="text-xs text-gray-700">{prompt.bpmRange}</span>
                </div>
                {prompt.moodTags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {prompt.moodTags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
