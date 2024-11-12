import { RmqOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

export const rabbitMqOptions = (): RmqOptions => {
  const configService = new ConfigService();

  return {
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>('RABBITMQ_URL') || 'amqp://localhost:5672'],
      queue: configService.get<string>('RABBITMQ_QUEUE') || 'calculations_queue',
      queueOptions: {
        durable: configService.get<boolean>('RABBITMQ_QUEUE_DURABLE') || true,
      },
    },
  };
};
