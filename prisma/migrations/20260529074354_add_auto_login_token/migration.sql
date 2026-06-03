-- DropIndex
DROP INDEX "pending_users_token_key";

-- CreateTable
CREATE TABLE "auto_login_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auto_login_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auto_login_tokens_token_key" ON "auto_login_tokens"("token");

-- AddForeignKey
ALTER TABLE "auto_login_tokens" ADD CONSTRAINT "auto_login_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
