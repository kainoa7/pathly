-- CreateTable
CREATE TABLE "MobileAppVote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "ipAddress" TEXT NOT NULL,
    "vote" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MobileAppVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "MobileAppVote_userId_key" ON "MobileAppVote"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MobileAppVote_ipAddress_key" ON "MobileAppVote"("ipAddress");
