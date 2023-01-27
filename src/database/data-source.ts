import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { databaseConfig } from '../config';

const configService = new ConfigService(databaseConfig());

console.warn('configService', configService);
console.warn('configService', configService.get('database.port'));

const options = {
  type: 'postgres',
  keepConnectionAlive: true,
  autoLoadEntities: true,
  synchronize: Boolean(process.env.SYNCHRONIZE) || true,
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT || 5432,
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || '1111',
  database: process.env.DATABASE_NAME || 'codeforstartup',
  dropSchema: false,
  entities: ['dist/entities/*.entity.{ts,js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
} as DataSourceOptions;

export const AppDataSource = new DataSource(options);

export default options;
