import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { rabbitMqOptions } from './rabbitmq.options';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService)
	const origin = configService.get<string>('ORIGIN')
	const port = configService.get<number>('PORT')

	const config = new DocumentBuilder()
		.setTitle('Math Microservice API Documentation')
		.setDescription('This API provides various mathematical calculations based on an input integer n. It determines parity, primality, factorial, sum of integers up to n, factors of n, and the nth Fibonacci number.')
		.setVersion('1.0')
		.build();

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('/docs', app, document)

	app.connectMicroservice(rabbitMqOptions());
	app.enableCors({ origin });

	await app.startAllMicroservices();
	await app.listen(port, () => console.log({
		server: `Server running on port ${port}`,
    	docs: `Documentation available at http://localhost:${port}/docs`
	}))
}
bootstrap();
