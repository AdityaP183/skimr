import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { AllowAnonymous } from "@thallesp/nestjs-better-auth";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	@AllowAnonymous()
	getHealthCheck() {
		return this.appService.getHealthCheck();
	}
}
