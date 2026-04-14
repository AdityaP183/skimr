import { Module } from "@nestjs/common";
import { CollectionsController } from "./collections.controller";
import { CollectionsService } from "./collections.service";
import { DatabaseModule } from "src/database/database.module";

@Module({
	controllers: [CollectionsController],
	providers: [CollectionsService],
	imports: [DatabaseModule],
})
export class CollectionsModule {}
