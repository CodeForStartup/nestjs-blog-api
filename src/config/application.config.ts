import { registerAs } from '@nestjs/config';

export default registerAs('application', () => ({
  port: process.env.PORT || 3000,
  apiPrefix: process.env.API_PREFIX || '',
}));
