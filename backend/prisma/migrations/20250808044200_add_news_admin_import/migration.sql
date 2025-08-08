/*
  Warnings:

  - Added the required column `source` to the `NewsArticle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `NewsArticle` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_NewsArticle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "imageUrl" TEXT,
    "sourceUrl" TEXT,
    "authorName" TEXT,
    "publishedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_NewsArticle" ("authorName", "category", "content", "createdAt", "id", "imageUrl", "publishedAt", "sourceUrl", "summary", "title", "updatedAt") SELECT "authorName", "category", "content", "createdAt", "id", "imageUrl", "publishedAt", "sourceUrl", "summary", "title", "updatedAt" FROM "NewsArticle";
DROP TABLE "NewsArticle";
ALTER TABLE "new_NewsArticle" RENAME TO "NewsArticle";
CREATE UNIQUE INDEX "NewsArticle_url_key" ON "NewsArticle"("url");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
