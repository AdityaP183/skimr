import { DATABASE_CONNECTION } from "@/database/database.connection";
import type { DrizzleDB } from "@/database/drizzle";
import { collection } from "@/database/schema";
import { Inject, Injectable } from "@nestjs/common";
import type { UserSession } from "@thallesp/nestjs-better-auth";
import { randomUUID } from "crypto";
import { and, eq } from "drizzle-orm";
import { CreateCollectionDto } from "./dto/create-collections.dto";
import { AppLoggerService } from "@/logger/logger.service";

@Injectable()
export class CollectionsService {
	private readonly context = CollectionsService.name;

	constructor(
		@Inject(DATABASE_CONNECTION) private readonly database: DrizzleDB,
		private readonly logger: AppLoggerService,
	) {}

	private getUserId(session: UserSession): string {
		return session.user.id as string;
	}

	async getCollections(session: UserSession) {
		const userId = this.getUserId(session);

		try {
			const collections = await this.database
				.select()
				.from(collection)
				.where(eq(collection.userId, userId));

			this.logger.log(`Collections fetched`, this.context, {
				userId,
				count: collections.length,
			});

			return collections;
		} catch (error: Error | any) {
			this.logger.error(
				`Failed to fetch collections`,
				error?.stack,
				this.context,
				{
					userId,
					error,
				},
			);
			throw error;
		}
	}

	async createCollection(
		createCollectionDto: CreateCollectionDto,
		session: UserSession,
	) {
		const userId = this.getUserId(session);

		try {
			const [newCollection] = await this.database
				.insert(collection)
				.values({
					...createCollectionDto,
					id: randomUUID(),
					userId,
				})
				.returning();

			this.logger.log("Collection created", this.context, {
				userId,
				collectionId: newCollection.id,
			});

			return newCollection;
		} catch (error: Error | any) {
			this.logger.error(
				"Failed to create collection",
				error?.stack,
				this.context,
				{
					userId,
				},
			);
			throw error;
		}
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
