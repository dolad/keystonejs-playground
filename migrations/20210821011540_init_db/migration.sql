-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "status" TEXT,
    "content" JSONB,
    "publishDate" TIMESTAMP(3),
    "owner" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "body" TEXT,
    "owner" TEXT,
    "created_at" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "role" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Comment_posts_Post_comments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Post.owner_index" ON "Post"("owner");

-- CreateIndex
CREATE UNIQUE INDEX "Comment.body_unique" ON "Comment"("body");

-- CreateIndex
CREATE INDEX "Comment.owner_index" ON "Comment"("owner");

-- CreateIndex
CREATE UNIQUE INDEX "Role.name_unique" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE INDEX "User.role_index" ON "User"("role");

-- CreateIndex
CREATE UNIQUE INDEX "_Comment_posts_Post_comments_AB_unique" ON "_Comment_posts_Post_comments"("A", "B");

-- CreateIndex
CREATE INDEX "_Comment_posts_Post_comments_B_index" ON "_Comment_posts_Post_comments"("B");

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("owner") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("owner") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("role") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Comment_posts_Post_comments" ADD FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Comment_posts_Post_comments" ADD FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
