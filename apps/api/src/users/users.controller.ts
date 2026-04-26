import type { auth } from "@/auth/auth";
import { AppLoggerService } from "@/logger/logger.service";
import { Controller, Get, Req } from "@nestjs/common";
import {
	AuthService,
	Session,
	type UserSession,
} from "@thallesp/nestjs-better-auth";
import { fromNodeHeaders } from "better-auth/node";
import type { Request as ExpressRequest } from "express";

@Controller("users")
export class UsersController {
	constructor(
		private authService: AuthService<typeof auth>,
		private readonly logger: AppLoggerService,
	) {}

	@Get("me")
	getUserInfo(@Session() session: UserSession) {
		const userInfo = session;

		this.logger.logRequest("GET", "/users/me", {
			userId: session.user.id,
		});

		return { ...userInfo };
	}

	@Get("sessions")
	async getUserSessions(@Req() req: ExpressRequest) {
		const userSessions = await this.authService.api.listSessions({
			headers: fromNodeHeaders(req.headers),
		});

		this.logger.logRequest("GET", "/users/sessions", {
			userId: userSessions[0]?.userId,
		});

		return {
			...userSessions,
		};
	}
}
