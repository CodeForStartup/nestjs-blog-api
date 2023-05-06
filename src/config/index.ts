import applicationConfig from './application.config';
import databaseConfig from './database.config';
import authConfig from './auth.config';
import redisConfig from './redis.config';

export interface IAppConfig {
  auth: ReturnType<typeof authConfig>;
  database: ReturnType<typeof databaseConfig>;
  application: ReturnType<typeof applicationConfig>;
  redis: ReturnType<typeof redisConfig>;
}

export { applicationConfig, databaseConfig, authConfig, redisConfig };
