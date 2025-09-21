-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "times" TEXT[] DEFAULT ARRAY[]::TEXT[];
