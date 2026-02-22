import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		bodyParser: false,
	});
	const configService = app.get(ConfigService);

	app.setGlobalPrefix("api");

	const config = new DocumentBuilder()
		.setTitle("Skimr Docs")
		.setDescription("The skimr API description")
		.setVersion("1.0")
		.addTag("skimr")
		.build();
	const documentFactory = () => SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("docs", app, documentFactory);

	const allowedOrigins = configService
		.getOrThrow<string>("APP_CORS_ORIGINS")
		.split(",");

	app.enableCors({
		origin: allowedOrigins,
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
		allowedHeaders: [
			"Content-Type",
			"Authorization",
			"X-Requested-With",
			"Accept",
		],
		credentials: true,
	});

	await app.listen(process.env.PORT ?? 8000);
}

bootstrap()
	.then(() => console.log(`Skimr API is running on PORT=${process.env.PORT}`))
	.catch((err) => console.error(err));
