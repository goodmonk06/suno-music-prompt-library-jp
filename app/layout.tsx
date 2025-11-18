import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Suno Music Prompt Library",
  description: "Suno向け音楽プロンプトライブラリ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 min-h-screen">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-900">
                  🎵 Suno Prompt Library
                </h1>
              </div>
              <div className="flex gap-4">
                <a href="/prompts" className="text-gray-700 hover:text-gray-900">
                  プロンプト一覧
                </a>
                <a
                  href="/prompts/new"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  新規作成
                </a>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
