import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { CollectionsService } from "./collections.service";
import { CreateCollectionDto } from "./dto/create-collections.dto";
import { Session, type UserSession } from "@thallesp/nestjs-better-auth";

@Controller("collections")
export class CollectionsController {
	constructor(private readonly collectionsService: CollectionsService) {}

	@Post()
	createCollection(
		@Session() session: UserSession,
		@Body() createCollectionDto: CreateCollectionDto,
	) {
		return this.collectionsService.createCollection(
			createCollectionDto,
			session,
		);
	}

	@Get()
	getCollections(@Session() session: UserSession) {
		return this.collectionsService.getCollections(session);
	}

	@Get(":id")
	getCollectionById(
		@Param("id") id: string,
		@Session() session: UserSession,
	) {
		return this.collectionsService.getCollectionById(session, id);
	}

	@Patch(":id")
	updateCollectionById(
		@Param("id") id: string,
		@Body() updateData: Partial<CreateCollectionDto>,
		@Session() session: UserSession,
	) {
		return this.collectionsService.updateCollectionById(
			session,
			id,
			updateData,
		);
	}

	@Delete(":id")
	deleteCollectionById(
		@Param("id") id: string,
		@Session() session: UserSession,
	) {
		return this.collectionsService.deleteCollectionById(session, id);
	}
}
