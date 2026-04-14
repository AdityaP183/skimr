import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { DATABASE_CONNECTION } from "./database.connection";
import { DrizzleDB } from "./drizzle";
import * as schema from "./schema";

@Module({
	imports: [ConfigModule],
	providers: [
		{
			provide: DATABASE_CONNECTION,
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				const pool = new Pool({
					connectionString: configService.getOrThrow("DATABASE_URL"),
				});

				return drizzle(pool, {
					schema,
				}) as DrizzleDB;
			},
		},
	],
	exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
