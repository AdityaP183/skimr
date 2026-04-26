import { AppController } from "@/app.controller";
import { AppService } from "@/app.service";
import { CollectionsModule } from "@/collections/collections.module";
import { DATABASE_CONNECTION } from "@/database/database.connection";
import { DatabaseModule } from "@/database/database.module";
import { UsersModule } from "@/users/users.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard, AuthModule } from "@thallesp/nestjs-better-auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { LoggerModule } from "@/logger/logger.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		AuthModule.forRootAsync({
			imports: [DatabaseModule],
			useFactory: (database: NodePgDatabase) => ({
				auth: betterAuth({
					baseURL: process.env.BETTER_AUTH_URL,
					trustedOrigins: ["http://localhost:3000"],
					database: drizzleAdapter(database, {
						provider: "pg",
					}),
					emailAndPassword: { enabled: true },
					socialProviders: {
						google: {
							clientId: process.env.GOOGLE_CLIENT_ID as string,
							clientSecret: process.env
								.GOOGLE_CLIENT_SECRET as string,
						},
					},
					user: {
						additionalFields: {
							role: {
								type: "string",
								required: true,
								defaultValue: "USER",
								input: false,
							},
						},
					},
				}),
			}),
			inject: [DATABASE_CONNECTION],
		}),
		UsersModule,
		CollectionsModule,
		LoggerModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class AppModule {}
