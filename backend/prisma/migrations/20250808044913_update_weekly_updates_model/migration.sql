/*
  Warnings:

  - You are about to drop the column `content` on the `WeeklyUpdate` table. All the data in the column will be lost.
  - You are about to drop the column `readAt` on the `WeeklyUpdate` table. All the data in the column will be lost.
  - Added the required column `html` to the `WeeklyUpdate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `WeeklyUpdate` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WeeklyUpdate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "html" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "openedAt" DATETIME,
    CONSTRAINT "WeeklyUpdate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_WeeklyUpdate" ("createdAt", "id", "userId") SELECT "createdAt", "id", "userId" FROM "WeeklyUpdate";
DROP TABLE "WeeklyUpdate";
ALTER TABLE "new_WeeklyUpdate" RENAME TO "WeeklyUpdate";
CREATE INDEX "WeeklyUpdate_userId_createdAt_idx" ON "WeeklyUpdate"("userId", "createdAt");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
