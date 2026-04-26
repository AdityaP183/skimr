import { Global, Module } from "@nestjs/common";
import { WinstonModule } from "nest-winston/dist/winston.module";
import { winstonConfig } from "./logger.config";
import { AppLoggerService } from "./logger.service";

@Global()
@Module({
	imports: [WinstonModule.forRoot(winstonConfig)],
	providers: [AppLoggerService],
	exports: [AppLoggerService],
})
export class LoggerModule {}
