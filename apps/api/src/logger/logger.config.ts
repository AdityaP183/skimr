import * as winston from "winston";
import * as path from "path";

const { combine, timestamp, errors, printf, colorize } = winston.format;

const logDir = path.resolve(process.cwd(), "data-logs");

const buildPrintf = () =>
	printf(({ level, message, timestamp, context, trace, ms, ...meta }) => {
		const logSource = context ? `[${context}]` : "[App]";

		const cleanMessage = String(message).replace(/\x1B\[[0-9;]*m/g, "");

		const extraMeta = Object.keys(meta).length
			? " " + JSON.stringify(meta)
			: "";

		const traceStr = trace ? `\n  Stack: ${trace}` : "";

		return `[${timestamp}] [${level.toUpperCase()}] ${logSource} ${cleanMessage}${extraMeta}${traceStr}`;
	});

export const consoleFormat = combine(
	timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
	errors({ stack: true }),
	buildPrintf(),
	colorize({ all: false, level: false, message: false }),
);

const fileFormat = combine(
	timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
	errors({ stack: true }),
	buildPrintf(),
);

export const winstonConfig: winston.LoggerOptions = {
	level: process.env.LOG_LEVEL || "info",
	transports: [
		new winston.transports.Console({
			format: consoleFormat,
		}),

		new winston.transports.File({
			filename: path.join(logDir, "combined.log"),
			format: fileFormat,
			maxsize: 10 * 1024 * 1024,
			maxFiles: 5,
			tailable: true,
		}),

		new winston.transports.File({
			filename: path.join(logDir, "error.log"),
			level: "error",
			format: fileFormat,
			maxsize: 10 * 1024 * 1024,
			maxFiles: 5,
			tailable: true,
		}),
	],

	exitOnError: false,
};
