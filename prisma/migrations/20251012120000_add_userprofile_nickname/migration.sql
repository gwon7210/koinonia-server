-- AlterTable
ALTER TABLE "public"."user_profiles" ADD COLUMN     "nickname" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_nickname_key" ON "public"."user_profiles"("nickname");
