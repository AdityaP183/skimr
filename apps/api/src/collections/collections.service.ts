import { Inject, Injectable } from "@nestjs/common";
import type { UserSession } from "@thallesp/nestjs-better-auth";
import { randomUUID } from "crypto";
import { eq, and } from "drizzle-orm";
import { DATABASE_CONNECTION } from "src/database/database.connection";
import type { DrizzleDB } from "src/database/drizzle";
import { collection } from "src/database/schema";
import { CreateCollectionDto } from "./dto/create-collections.dto";

@Injectable()
export class CollectionsService {
	constructor(
		@Inject(DATABASE_CONNECTION) private readonly database: DrizzleDB,
	) {}

	async getCollections(session: UserSession) {
		const userId = session.user.id as string;
		const collections = await this.database
			.select()
			.from(collection)
			.where(eq(collection.userId, userId));
		return collections;
	}

	async createCollection(
		createCollectionDto: CreateCollectionDto,
		session: UserSession,
	) {
		const userId = session.user.id as string;
		const [newCollection] = await this.database
			.insert(collection)
			.values({
				...createCollectionDto,
				id: randomUUID(),
				userId,
			})
			.returning();

		return newCollection;
	}

	async getCollectionById(session: UserSession, id: string) {
		const userId = session.user.id as string;
		const collectionById = await this.database
			.select()
			.from(collection)
			.where(and(eq(collection.id, id), eq(collection.userId, userId)));
		return collectionById;
	}

	async updateCollectionById(
		session: UserSession,
		id: string,
		updateData: Partial<CreateCollectionDto>,
	) {
		const userId = session.user.id as string;

		const [updatedCollection] = await this.database
			.update(collection)
			.set(updateData)
			.where(and(eq(collection.id, id), eq(collection.userId, userId)))
			.returning();

		return updatedCollection;
	}

	async deleteCollectionById(session: UserSession, id: string) {
		const userId = session.user.id as string;

		const [deletedCollection] = await this.database
			.delete(collection)
			.where(and(eq(collection.id, id), eq(collection.userId, userId)))
			.returning();
		return deletedCollection;
	}
}
