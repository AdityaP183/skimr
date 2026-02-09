CREATE TYPE "public"."role" AS ENUM('admin', 'creator', 'user');--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" "role" DEFAULT 'user' NOT NULL;