import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
	getHealthCheck() {
		return {
			status: "ok",
			message: "Skimr API is alive and running",
			timestamp: Date.now(),
		};
	}
}
