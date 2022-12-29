import * as Joi from 'joi';

export interface ConfigVariables {
  port: number;
  database: {
    host: string;
    port: number;
  };
}

export default (): ConfigVariables => ({
  port: parseInt(process.env.PORT, 10),
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
  },
});

export const validationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  DATABASE_HOST: Joi.string().default('localhost'),
  DATABASE_PORT: Joi.number().default(5432),
});
