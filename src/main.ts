import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create<NestFastifyApplication>(AppModule,
    new FastifyAdapter());
  app.enableCors();
  await app.listen(13000, '0.0.0.0');

  const options = new DocumentBuilder()
    .setTitle('Snippets')
    .setVersion('1.0')
    .addTag('Snippets')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
}

bootstrap();
