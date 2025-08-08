-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "accountType" TEXT NOT NULL DEFAULT 'EXPLORER',
    "githubId" TEXT,
    "university" TEXT,
    "graduationYear" TEXT,
    "major" TEXT,
    "interests" TEXT NOT NULL DEFAULT '[]',
    "goals" TEXT,
    "onboardingComplete" BOOLEAN NOT NULL DEFAULT false,
    "stripeCustomerId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("accountType", "createdAt", "email", "firstName", "githubId", "graduationYear", "id", "lastName", "password", "stripeCustomerId", "university", "updatedAt") SELECT "accountType", "createdAt", "email", "firstName", "githubId", "graduationYear", "id", "lastName", "password", "stripeCustomerId", "university", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_githubId_key" ON "User"("githubId");
CREATE UNIQUE INDEX "User_stripeCustomerId_key" ON "User"("stripeCustomerId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
