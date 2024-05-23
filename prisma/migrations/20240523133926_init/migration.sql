-- CreateTable
CREATE TABLE "adonis_schema" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "batch" INTEGER NOT NULL,
    "migration_time" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "adonis_schema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adonis_schema_versions" (
    "version" INTEGER NOT NULL,

    CONSTRAINT "adonis_schema_versions_pkey" PRIMARY KEY ("version")
);

-- CreateTable
CREATE TABLE "articles" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(0),
    "title" VARCHAR(50) NOT NULL,
    "content" TEXT NOT NULL,
    "image_article" TEXT NOT NULL,
    "userId" INTEGER,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_favorites" (
    "id" SERIAL NOT NULL,
    "pokemon_id" INTEGER NOT NULL,
    "user_id" INTEGER,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "user_favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(80) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "profil_picture" TEXT,
    "is_admin" BOOLEAN DEFAULT false,
    "is_active" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "articles_userid_foreign" ON "articles"("userId");

-- CreateIndex
CREATE INDEX "user_favorites_user_id_foreign" ON "user_favorites"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_unique" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_unique" ON "users"("email");

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorites" ADD CONSTRAINT "user_favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
