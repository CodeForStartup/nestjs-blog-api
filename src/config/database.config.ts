import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: process.env.DATABASE_TYPE || 'postgres',
  url: process.env.DATABASE_URL || 'localhost',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || '1111',
  database_name: process.env.DATABASE_NAME || 'codeforstartup',
  synchronize: Boolean(process.env.SYNCHRONIZE) || false,
  maxConnections: Number(process.env.MAX_CONNECTIONS) || 5,
  sslEnabled: Boolean(process.env.SSL_ENABLED) || false,
}));
