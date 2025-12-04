import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix("api");
	await app.listen(process.env.PORT ?? 3000);
}

bootstrap()
	.then(() => console.log("Skimr API is running"))
	.catch((err) => console.error(err));
