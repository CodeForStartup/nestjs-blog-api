import { DataSource, DataSourceOptions } from 'typeorm';
// import { ConfigService } from '@nestjs/config';
// import { databaseConfig } from '../config';

// const configService = new ConfigService(databaseConfig());

// TODO: use configService
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
