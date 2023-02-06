import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { applicationConfig, databaseConfig, authConfig } from 'src/config';
import { UserModule } from 'src/modules/user/user.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { ForgotModule } from 'src/modules/forgot/forgot.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV
        ? `.env.${process.env.NODE_ENV}`
        : '.env',
      isGlobal: true,
      cache: true,
      expandVariables: true,
      load: [applicationConfig, databaseConfig, authConfig],
      validationOptions: {
        allowUnknown: true,
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        keepConnectionAlive: true,
        autoLoadEntities: true,
        synchronize: configService.get('database.synchronize'),
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database_name'),
        entities: ['dist/entities/*.entity.{ts,js}'],
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      }),
      inject: [ConfigService],
      dataSourceFactory: async (options) =>
        new DataSource(options).initialize(),
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    UserModule,
    AuthModule,
    ForgotModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
