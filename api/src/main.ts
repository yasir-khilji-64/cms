import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Main', { timestamp: true });
  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get<ConfigService>(ConfigService);
    const port = configService.get('PORT');

    app.use(helmet());
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );
    app.setGlobalPrefix('/api/v1', {
      exclude: [
        { path: 'auth/register', method: RequestMethod.POST },
        { path: 'auth/login', method: RequestMethod.POST },
      ],
    });
    const config = new DocumentBuilder()
      .setTitle('CMS')
      .setDescription(
        'A comprehensive monorepo-based CMS for seamless content creation, management, and interaction.',
      )
      .setVersion('0.1')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document, {
      jsonDocumentUrl: 'api/docs/json',
    });
    await app.listen(port, '0.0.0.0', async () => {
      logger.log(`Server listening on ${await app.getUrl()}`);
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}
bootstrap();
