import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { ErrorResponseDto } from './utils/dtos/errorResponse.dto';
import { MathResponseDto } from './utils/dtos/mathResponse.dto';

@Controller()
export class AppController {
	private client: ClientProxy;

	constructor(private readonly configService: ConfigService) {
		this.client = ClientProxyFactory.create({
			transport: Transport.RMQ,
			options: {
				urls: [this.configService.get<string>('RABBITMQ_URL') || 'amqp://localhost:5672'],
				queue: this.configService.get<string>('RABBITMQ_QUEUE') || 'calculations_queue',
				queueOptions: {
					durable: this.configService.get<boolean>('RABBITMQ_QUEUE_DURABLE') || true,
				},
			},
		});
	}

	@ApiOperation({ summary: 'Calculate various mathematical operations based on an input integer n' })
	@ApiQuery({
		name: 'number',
		type: Number,
		description: 'The integer n to perform calculations on',
		example: 5,
	})
	@ApiResponse({
		status: 200,
		description: 'The result of the mathematical operations',
		type: MathResponseDto,
	})
	@ApiResponse({
		status: 400,
		description: 'Error message if the input is invalid',
		type: ErrorResponseDto,
	})
	@Get('calculate')
	async calculate(@Query('number') number: string) {
		const n = parseInt(number, 10);

		// * Here we validate the input to ensure it is a positive integer less than or equal to 100 to optimize performance with large numbers
		if (!n || n <= 0 || !Number.isInteger(n) || n > 100) {
			throw new BadRequestException('El número debe ser un entero positivo menor o igual a 100');
		}

		return this.client.send<MathResponseDto>('calculate', n)
	}
}