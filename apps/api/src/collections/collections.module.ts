import { DatabaseModule } from "@/database/database.module";
import { Module } from "@nestjs/common";
import { CollectionsController } from "./collections.controller";
import { CollectionsService } from "./collections.service";

@Module({
	controllers: [CollectionsController],
	providers: [CollectionsService],
	imports: [DatabaseModule],
})
export class CollectionsModule {}
