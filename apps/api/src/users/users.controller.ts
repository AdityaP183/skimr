import { Controller, Get } from "@nestjs/common";

@Controller("users")
export class UsersController {
	@Get("/")
	getHello() {
		return {
			status: "Ok",
		};
	}

	@Get("session")
	getSession() {
		return {};
	}
}
