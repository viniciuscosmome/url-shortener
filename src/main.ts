import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { documentBuilder } from './shared/docs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');

  app.useGlobalPipes(new ValidationPipe());

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
}
bootstrap();
