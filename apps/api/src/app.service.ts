import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class AppService {
	private readonly logger = new Logger(AppService.name);

	getHealthCheck() {
		this.logger.debug("Health check requested");

		return {
			status: "ok",
			service: "api",
			timestamp: new Date().toISOString(),
		};
	}
}
