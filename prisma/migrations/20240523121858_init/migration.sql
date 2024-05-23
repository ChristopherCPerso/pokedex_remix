-- CreateTable
CREATE TABLE "adonis_schema" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "batch" INTEGER NOT NULL,
    "migration_time" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "adonis_schema_versions" (
    "version" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "articles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image_article" TEXT NOT NULL,
    "userId" INTEGER,
    "created_at" DATETIME,
    "updated_at" DATETIME,
    CONSTRAINT "articles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user_favorites" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pokemon_id" INTEGER NOT NULL,
    "user_id" INTEGER,
    "created_at" DATETIME,
    "updated_at" DATETIME,
    CONSTRAINT "user_favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profil_picture" TEXT,
    "is_admin" BOOLEAN DEFAULT false,
    "is_active" BOOLEAN DEFAULT false,
    "created_at" DATETIME,
    "updated_at" DATETIME
);

-- CreateIndex
CREATE INDEX "articles_userid_foreign" ON "articles"("userId");

-- CreateIndex
CREATE INDEX "user_favorites_user_id_foreign" ON "user_favorites"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_unique" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_unique" ON "users"("email");
