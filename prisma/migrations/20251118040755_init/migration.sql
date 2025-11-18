-- CreateTable
CREATE TABLE "MusicPrompt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mainPrompt" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "bpmRange" TEXT NOT NULL,
    "moodTags" TEXT NOT NULL,
    "usageTags" TEXT NOT NULL,
    "youtubeTitleTemplate" TEXT,
    "youtubeDescriptionTemplate" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "MusicPrompt_genre_idx" ON "MusicPrompt"("genre");

-- CreateIndex
CREATE INDEX "MusicPrompt_createdAt_idx" ON "MusicPrompt"("createdAt");
