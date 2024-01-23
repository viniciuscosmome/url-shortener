import type { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function swaggerConfiguration(
  app: INestApplication,
  node_env: string,
  port?: string,
) {
  const builder = new DocumentBuilder()
    .setTitle('Encurtador de URLs')
    .setDescription(
      'Api desenvolvida para encurtar urls e exibir quantidade de cliques',
    )
    .setVersion('0.0.1')
    .setLicense(
      'Licença MIT',
      'https://github.com/viniciuscosmome/url-shortener/blob/main/LICENSE',
    )
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

  if (node_env === 'development') {
    builder.servers.push({
      url: `http://localhost:${port}/`,
      description: 'Servidor de desenvolvimento',
    });
  }

  const document = SwaggerModule.createDocument(app, builder);
  SwaggerModule.setup('docs', app, document);
}
