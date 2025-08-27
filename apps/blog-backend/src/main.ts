import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './prisma-exception-filter/prisma-exception-filter.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: ['http://localhost:5173'] });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('Median - Mini Medium Clone')
    .setDescription(
      'A simple API to manage users and blog posts with easy-to-use endpoints in NestJS.',
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .addTag('Users', 'Everything about user accounts')
    .addTag('Articles', 'Manage blog articles: create, read, update, delete')
    .addTag('Auth', 'Manage User Authentication')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
