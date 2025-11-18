-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "visibility" TEXT NOT NULL DEFAULT 'private',
    "userId" TEXT,
    "promptCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CollectionPrompt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "collectionId" TEXT NOT NULL,
    "promptId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "addedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CollectionPrompt_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CollectionPrompt_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "MusicPrompt" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PromptTag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "promptId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "addedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PromptTag_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "MusicPrompt" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PromptTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PromptVersion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "promptId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mainPrompt" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "bpmRange" TEXT NOT NULL,
    "moodTags" TEXT NOT NULL,
    "usageTags" TEXT NOT NULL,
    "youtubeTitleTemplate" TEXT,
    "youtubeDescriptionTemplate" TEXT,
    "changeNote" TEXT,
    "createdBy" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PromptVersion_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "MusicPrompt" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PromptUsage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "promptId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "userId" TEXT,
    "metadata" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PromptUsage_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "MusicPrompt" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MusicPrompt" (
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
    "status" TEXT NOT NULL DEFAULT 'published',
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "copyCount" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_MusicPrompt" ("bpmRange", "createdAt", "description", "genre", "id", "mainPrompt", "moodTags", "title", "updatedAt", "usageTags", "youtubeDescriptionTemplate", "youtubeTitleTemplate") SELECT "bpmRange", "createdAt", "description", "genre", "id", "mainPrompt", "moodTags", "title", "updatedAt", "usageTags", "youtubeDescriptionTemplate", "youtubeTitleTemplate" FROM "MusicPrompt";
DROP TABLE "MusicPrompt";
ALTER TABLE "new_MusicPrompt" RENAME TO "MusicPrompt";
CREATE INDEX "MusicPrompt_genre_idx" ON "MusicPrompt"("genre");
CREATE INDEX "MusicPrompt_status_idx" ON "MusicPrompt"("status");
CREATE INDEX "MusicPrompt_createdAt_idx" ON "MusicPrompt"("createdAt");
CREATE INDEX "MusicPrompt_userId_idx" ON "MusicPrompt"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "Collection_userId_idx" ON "Collection"("userId");

-- CreateIndex
CREATE INDEX "Collection_visibility_idx" ON "Collection"("visibility");

-- CreateIndex
CREATE INDEX "Collection_createdAt_idx" ON "Collection"("createdAt");

-- CreateIndex
CREATE INDEX "CollectionPrompt_collectionId_idx" ON "CollectionPrompt"("collectionId");

-- CreateIndex
CREATE INDEX "CollectionPrompt_promptId_idx" ON "CollectionPrompt"("promptId");

-- CreateIndex
CREATE UNIQUE INDEX "CollectionPrompt_collectionId_promptId_key" ON "CollectionPrompt"("collectionId", "promptId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "Tag_type_idx" ON "Tag"("type");

-- CreateIndex
CREATE INDEX "Tag_usageCount_idx" ON "Tag"("usageCount");

-- CreateIndex
CREATE INDEX "PromptTag_promptId_idx" ON "PromptTag"("promptId");

-- CreateIndex
CREATE INDEX "PromptTag_tagId_idx" ON "PromptTag"("tagId");

-- CreateIndex
CREATE UNIQUE INDEX "PromptTag_promptId_tagId_key" ON "PromptTag"("promptId", "tagId");

-- CreateIndex
CREATE INDEX "PromptVersion_promptId_idx" ON "PromptVersion"("promptId");

-- CreateIndex
CREATE INDEX "PromptVersion_createdAt_idx" ON "PromptVersion"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "PromptVersion_promptId_version_key" ON "PromptVersion"("promptId", "version");

-- CreateIndex
CREATE INDEX "PromptUsage_promptId_idx" ON "PromptUsage"("promptId");

-- CreateIndex
CREATE INDEX "PromptUsage_action_idx" ON "PromptUsage"("action");

-- CreateIndex
CREATE INDEX "PromptUsage_timestamp_idx" ON "PromptUsage"("timestamp");

-- CreateIndex
CREATE INDEX "PromptUsage_userId_idx" ON "PromptUsage"("userId");
