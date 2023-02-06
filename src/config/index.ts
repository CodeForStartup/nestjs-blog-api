import applicationConfig from './application.config';
import databaseConfig from './database.config';
import authConfig from './auth.config';

export interface IAppConfig {
  auth: ReturnType<typeof authConfig>;
  database: ReturnType<typeof databaseConfig>;
  application: ReturnType<typeof applicationConfig>;
}

export { applicationConfig, databaseConfig, authConfig };
