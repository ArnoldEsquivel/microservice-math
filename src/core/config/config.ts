import { registerAs } from '@nestjs/config'

export default registerAs('config', () => {
	return {
		port: parseInt(process.env.PORT, 10) || 3000,
        origin: process.env.ORIGIN || '*',
        rabbitMq: {
            url: process.env.RABBITMQ_URL.split(','),
            queue: process.env.RABBITMQ_QUEUE,
            queueOptions: {
                durable: process.env.RABBITMQ_QUEUE_DURABLE === 'true',
            },
        },
	}
})
