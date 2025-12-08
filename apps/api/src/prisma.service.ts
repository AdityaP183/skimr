import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "generated/prisma/client";

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	async onModuleInit() {
		console.log("Prisma client connected...");
		await this.$connect();
	}

	async onModuleDestroy() {
		console.log("Prisma client disconnected...");
		await this.$disconnect();
	}
}
