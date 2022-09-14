/*
  Warnings:

  - Added the required column `name` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "banner" TEXT NOT NULL
);
INSERT INTO "new_Game" ("banner", "id") SELECT "banner", "id" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
