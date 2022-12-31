import * as Joi from 'joi';
import applicationConfig from './application.config';
import databaseConfig from './database.config';

export const validationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  DATABASE_HOST: Joi.string().default('localhost'),
  DATABASE_PORT: Joi.number().default(5432),
  DATABASE_USERNAME: Joi.string().default('postgres'),
  DATABASE_PASSWORD: Joi.string().default(''),
  DATABASE_NAME: Joi.string(),
});

export { applicationConfig, databaseConfig };
