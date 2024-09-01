/*
  Warnings:

  - You are about to drop the `_UserFollows` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserFollows" DROP CONSTRAINT "_UserFollows_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserFollows" DROP CONSTRAINT "_UserFollows_B_fkey";

-- AlterTable
ALTER TABLE "Blog" ALTER COLUMN "publishedOn" DROP NOT NULL;

-- DropTable
DROP TABLE "_UserFollows";

-- CreateTable
CREATE TABLE "Follows" (
    "id" SERIAL NOT NULL,
    "followerId" INTEGER NOT NULL,
    "followeeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Follows_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Follows_followerId_followeeId_key" ON "Follows"("followerId", "followeeId");

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followeeId_fkey" FOREIGN KEY ("followeeId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
