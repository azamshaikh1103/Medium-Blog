/*
  Warnings:

  - You are about to drop the column `auhtorId` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `headline` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_auhtorId_fkey";

-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "auhtorId",
DROP COLUMN "title",
ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "headline" TEXT NOT NULL,
ADD COLUMN     "publishedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "shortDesc" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name";

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "profilePic" TEXT,
    "shortBio" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookmark" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "blogId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserFollows" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_userId_blogId_key" ON "Bookmark"("userId", "blogId");

-- CreateIndex
CREATE UNIQUE INDEX "_UserFollows_AB_unique" ON "_UserFollows"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFollows_B_index" ON "_UserFollows"("B");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollows" ADD CONSTRAINT "_UserFollows_A_fkey" FOREIGN KEY ("A") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollows" ADD CONSTRAINT "_UserFollows_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
