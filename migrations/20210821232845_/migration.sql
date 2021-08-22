/*
  Warnings:

  - You are about to drop the `_Comment_posts_Post_comments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Comment_posts_Post_comments" DROP CONSTRAINT "_Comment_posts_Post_comments_A_fkey";

-- DropForeignKey
ALTER TABLE "_Comment_posts_Post_comments" DROP CONSTRAINT "_Comment_posts_Post_comments_B_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "posts" TEXT;

-- DropTable
DROP TABLE "_Comment_posts_Post_comments";

-- CreateIndex
CREATE INDEX "Comment.posts_index" ON "Comment"("posts");

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("posts") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
