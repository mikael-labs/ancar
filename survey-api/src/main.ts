import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';

import { AppModule } from './app.module';
import { BaseErrorFilter } from './infra/error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalFilters(new BaseErrorFilter());

  const config = new DocumentBuilder()
    .setTitle('Quiz API')
    .setDescription('API that provides Quizzes operations')
    .setVersion('1.0')
    .addTag('quizzes')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const PORT = process.env.PORT ?? 3000;

  await app.listen(PORT);
}
bootstrap();
