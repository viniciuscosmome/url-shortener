-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "short_urls" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "destiny" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "user_id" TEXT,
    "deleted_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "short_urls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "short_urls_code_key" ON "short_urls"("code");

-- AddForeignKey
ALTER TABLE "short_urls" ADD CONSTRAINT "short_urls_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
