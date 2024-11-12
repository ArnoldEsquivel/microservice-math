import * as Joi from 'joi'

export const validSchema = Joi.object({
	NODE_ENV: Joi.valid('development', 'production').required(),
	PORT: Joi.number().required(),
	ORIGIN: Joi.string().required(),
    RABBITMQ_URL: Joi.string().required(),
    RABBITMQ_QUEUE: Joi.string().required(),
    RABBITMQ_QUEUE_DURABLE: Joi.boolean().required(),
})
