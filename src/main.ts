import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const theme = new SwaggerTheme();

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const config = new DocumentBuilder()
    .setTitle('Itch.io Alternative API')
    .setDescription('Alternative API for searching games on itch.io')
    .setVersion('2.0')
    .addServer('https://itch.andrepaiva.dev', 'Production')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customCss: `
      ${theme.getBuffer(SwaggerThemeNameEnum.DRACULA)}
      .swagger-ui .topbar { background-color: #ff244a !important; } /* vermelho */
      .swagger-ui .topbar .link span { color: #fff !important; }
    `,
    customSiteTitle: 'Itch.io Alternative API Docs',
    customfavIcon: 'https://itch.io/favicon.ico',
  });

  await app.listen(3000, '0.0.0.0');
  Logger.log(`🚀 Server running at http://localhost:3000`, 'Bootstrap');
  Logger.log(`📖 Swagger docs at http://localhost:3000/docs`, 'Bootstrap');
}
bootstrap().catch((err) => {
  Logger.error('Error during bootstrap', err, 'Bootstrap');
});
