/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `groups` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `threads` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `groups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `threads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "groups" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "threads" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "groups_slug_key" ON "groups"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "threads_slug_key" ON "threads"("slug");
