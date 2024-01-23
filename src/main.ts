import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { swaggerConfiguration } from './global/docs/swagger.config';
import { AppModule } from './app.module';
import { validationPipeOptions } from './global/errors/validation-pipe.configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');
  const node_env = configService.get<string>('NODE_ENV');

  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
  swaggerConfiguration(app, node_env, port);

  await app.listen(port);
}
bootstrap();
