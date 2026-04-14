ALTER TABLE "folders" RENAME TO "collections";--> statement-breakpoint
ALTER TABLE "collections" DROP CONSTRAINT "folders_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "collections" ADD CONSTRAINT "collections_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;