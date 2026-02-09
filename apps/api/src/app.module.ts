import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";
import { AuthGuard, AuthModule } from "@thallesp/nestjs-better-auth";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { DATABASE_CONNECTION } from "./database/database.connection";
import { UsersModule } from "./users/users.module";
import { APP_GUARD } from "@nestjs/core";

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
				}),
			}),
			inject: [DATABASE_CONNECTION],
		}),
		UsersModule,
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
