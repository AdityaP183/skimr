import { Controller, Get } from "@nestjs/common";
import { AllowAnonymous } from "@thallesp/nestjs-better-auth";
import { AppService } from "./app.service";
import { AppLoggerService } from "./logger/logger.service";

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly logger: AppLoggerService,
	) {}

	@Get()
	@AllowAnonymous()
	getHealthCheck() {
		this.logger.logRequest("GET", "/");
		return this.appService.getHealthCheck();
	}
}
