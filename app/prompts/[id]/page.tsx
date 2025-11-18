"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { MusicPrompt } from "@/lib/types";

export default function PromptDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [prompt, setPrompt] = useState<MusicPrompt | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchPrompt();
  }, []);

  const fetchPrompt = async () => {
    try {
      const response = await fetch(`/api/prompts/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setPrompt(data);
      } else {
        alert("プロンプトが見つかりません");
        router.push("/prompts");
      }
    } catch (error) {
      console.error("Error fetching prompt:", error);
      alert("読み込みに失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleDelete = async () => {
    if (!confirm("本当に削除しますか?")) return;

    try {
      const response = await fetch(`/api/prompts/${params.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/prompts");
      } else {
        alert("削除に失敗しました");
      }
    } catch (error) {
      console.error("Error deleting prompt:", error);
      alert("削除に失敗しました");
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-center text-gray-600">読み込み中...</p>
      </div>
    );
  }

  if (!prompt) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {prompt.title}
          </h1>
          <p className="text-gray-600">{prompt.description}</p>
        </div>
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-900"
        >
          ← 戻る
        </button>
      </div>

      <div className="space-y-6">
        {/* メインプロンプト */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">メインプロンプト</h2>
            <button
              onClick={() => handleCopy(prompt.mainPrompt)}
              className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              {copied ? "コピーしました!" : "コピー"}
            </button>
          </div>
          <pre className="bg-gray-50 p-4 rounded border border-gray-200 whitespace-pre-wrap font-mono text-sm">
            {prompt.mainPrompt}
          </pre>
        </div>

        {/* メタデータ */}
        <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">メタデータ</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">ジャンル</p>
              <p className="text-gray-900">{prompt.genre}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">BPM範囲</p>
              <p className="text-gray-900">{prompt.bpmRange}</p>
            </div>
          </div>

          {prompt.moodTags.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">
                ムードタグ
              </p>
              <div className="flex flex-wrap gap-2">
                {prompt.moodTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {prompt.usageTags.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">用途タグ</p>
              <div className="flex flex-wrap gap-2">
                {prompt.usageTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">作成日時</p>
            <p className="text-gray-900">
              {new Date(prompt.createdAt).toLocaleString("ja-JP")}
            </p>
          </div>
        </div>

        {/* YouTubeテンプレート */}
        {(prompt.youtubeTitleTemplate ||
          prompt.youtubeDescriptionTemplate) && (
          <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2">
              YouTubeテンプレート
            </h2>

            {prompt.youtubeTitleTemplate && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-gray-500">
                    タイトルテンプレート
                  </p>
                  <button
                    onClick={() => handleCopy(prompt.youtubeTitleTemplate!)}
                    className="text-xs text-blue-600 hover:text-blue-700"
                  >
                    コピー
                  </button>
                </div>
                <p className="bg-gray-50 p-3 rounded border border-gray-200">
                  {prompt.youtubeTitleTemplate}
                </p>
              </div>
            )}

            {prompt.youtubeDescriptionTemplate && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-gray-500">
                    説明文テンプレート
                  </p>
                  <button
                    onClick={() =>
                      handleCopy(prompt.youtubeDescriptionTemplate!)
                    }
                    className="text-xs text-blue-600 hover:text-blue-700"
                  >
                    コピー
                  </button>
                </div>
                <pre className="bg-gray-50 p-3 rounded border border-gray-200 whitespace-pre-wrap text-sm">
                  {prompt.youtubeDescriptionTemplate}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* アクション */}
        <div className="flex gap-4">
          <button
            onClick={handleDelete}
            className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            削除
          </button>
        </div>
      </div>
    </div>
  );
}
