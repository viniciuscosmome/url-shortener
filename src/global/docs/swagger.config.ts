import { DocumentBuilder } from '@nestjs/swagger';

export const documentBuilder = new DocumentBuilder()
  .setTitle('Encurtador de URLs')
  .setDescription(
    'Api desenvolvida para encurtar urls e exibir quantidade de cliques',
  )
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
