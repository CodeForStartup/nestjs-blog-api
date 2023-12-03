import { BullModule } from '@nestjs/bull';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { DataSource } from 'typeorm';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import {
  applicationConfig,
  databaseConfig,
  authConfig,
  redisConfig,
} from 'src/config';
import { UserModule } from 'src/modules/user/user.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { ForgotModule } from 'src/modules/forgot/forgot.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV
        ? `.env.${process.env.NODE_ENV}`
        : '.env',
      isGlobal: true,
      cache: true,
      expandVariables: true,
      load: [applicationConfig, databaseConfig, authConfig, redisConfig],
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
        timezone: 'Z',
      }),
      inject: [ConfigService],
      dataSourceFactory: async (options) =>
        new DataSource(options).initialize(),
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('redis.host'),
          port: configService.get('redis.port'),
        },
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('mail.host'),
          secure: false,
          auth: {
            user: configService.get('mail.user'),
            pass: configService.get('mail.password'),
          },
        },
        defaults: {
          from: `"${configService.get(
            'mail.default_name',
          )}" <${configService.get('mail.default_email')}>`,
        },
        template: {
          dir: __dirname + '/modules/email/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
        preview: true,
      }),
      inject: [ConfigService],
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
