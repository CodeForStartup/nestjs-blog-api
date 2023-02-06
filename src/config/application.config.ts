import { registerAs } from '@nestjs/config';

export default registerAs('application', () => ({
  node_env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,
  apiPrefix: process.env.API_PREFIX || 'api',
}));
