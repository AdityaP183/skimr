import { Injectable, Inject, LoggerService } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";

export interface LogMeta {
	userId?: string | number;
	requestId?: string;
	resource?: string;
	action?: string;
	duration?: number;
	statusCode?: number;
	[key: string]: unknown;
}

@Injectable()
export class AppLoggerService implements LoggerService {
	constructor(
		@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
	) {}

	log(message: string, context?: string, meta?: LogMeta) {
		this.logger.info(message, { context, ...meta });
	}

	error(message: string, trace?: string, context?: string, meta?: LogMeta) {
		this.logger.error(message, { context, trace, ...meta });
	}

	warn(message: string, context?: string, meta?: LogMeta) {
		this.logger.warn(message, { context, ...meta });
	}

	debug(message: string, context?: string, meta?: LogMeta) {
		this.logger.debug(message, { context, ...meta });
	}

	verbose(message: string, context?: string, meta?: LogMeta) {
		this.logger.verbose(message, { context, ...meta });
	}

	logRequest(method: string, url: string, meta?: LogMeta) {
		this.logger.info(`${method} ${url}`, {
			context: "HTTP",
			type: "request",
			...meta,
		});
	}

	logResponse(
		method: string,
		url: string,
		statusCode: number,
		duration: number,
		meta?: LogMeta,
	) {
		const level =
			statusCode >= 500 ? "error" : statusCode >= 400 ? "warn" : "info";
		this.logger.log(
			level,
			`${method} ${url} ${statusCode} +${duration}ms`,
			{
				context: "HTTP",
				type: "response",
				statusCode,
				duration,
				...meta,
			},
		);
	}

	logQuery(query: string, durationMs?: number, meta?: LogMeta) {
		this.logger.debug(`${query}`, {
			context: "Database",
			durationMs,
			...meta,
		});
	}

	logAuth(
		event: "login" | "logout" | "register" | "failed",
		userId?: string | number,
		meta?: LogMeta,
	) {
		const level = event === "failed" ? "warn" : "info";
		this.logger.log(level, `Auth event: ${event}`, {
			context: "Auth",
			userId,
			...meta,
		});
	}
}
