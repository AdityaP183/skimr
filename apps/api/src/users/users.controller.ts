import { Controller, Get, Req } from "@nestjs/common";
import {
	AuthService,
	Session,
	type UserSession,
} from "@thallesp/nestjs-better-auth";
import { fromNodeHeaders } from "better-auth/node";
import type { Request as ExpressRequest } from "express";
import { auth } from "src/auth/auth";

@Controller("users")
export class UsersController {
	constructor(private authService: AuthService<typeof auth>) {}

	@Get("me")
	getUserInfo(@Session() session: UserSession) {
		const userInfo = session;
		return { ...userInfo };
	}

	@Get("sessions")
	async getUserSessions(@Req() req: ExpressRequest) {
		const userSessions = await this.authService.api.listSessions({
			headers: fromNodeHeaders(req.headers),
		});

		return {
			...userSessions,
		};
	}
}
