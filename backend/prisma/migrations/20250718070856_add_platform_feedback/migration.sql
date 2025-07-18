-- CreateTable
CREATE TABLE "PlatformFeedback" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "ipAddress" TEXT NOT NULL,
    "voteType" TEXT NOT NULL,
    "feedback" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PlatformFeedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "PlatformFeedback_userId_voteType_key" ON "PlatformFeedback"("userId", "voteType");

-- CreateIndex
CREATE UNIQUE INDEX "PlatformFeedback_ipAddress_voteType_key" ON "PlatformFeedback"("ipAddress", "voteType");
