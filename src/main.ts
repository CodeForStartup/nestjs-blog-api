import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix(configService.get('application.apiPrefix'), {
    exclude: ['/'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const errorMessages = {};
        errors.forEach((error) => {
          errorMessages[error.property] = Object.values(error.constraints).at(
            0,
          );
        });
        return new BadRequestException(errorMessages);
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('CODE FOR STARTUP - TOP LIST')
    .setDescription('APIs for Top List - Listing top ranking')
    .setVersion('1.0')
    .addTag('top.list')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.get('application.port') || 3000);
}

bootstrap();
