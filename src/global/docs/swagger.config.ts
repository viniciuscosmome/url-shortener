import { DocumentBuilder } from '@nestjs/swagger';

export const documentBuilder = new DocumentBuilder()
  .setTitle('Encurtador de URLs')
  .setVersion('0.0.1')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      name: 'authorization',
      in: 'header',
      bearerFormat: 'JWT',
      description: 'Use o `accessToken`, ele é obtido no login',
    },
    'access',
  )
  .build();
