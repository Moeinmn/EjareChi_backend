import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrismaService } from './infrastructure/prisma/prisma.service';
import { LoggingInterceptor } from './logging.interceptor';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  //Enabling versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  //Enabling Global Middlewares
  app.useGlobalInterceptors(new LoggingInterceptor());

  app.useLogger(app.get(Logger , {strict : false}))

  //Enabling Prisma
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  //Enabling class-validator and class-transformer
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  //Configuring swagger
  const config = new DocumentBuilder()
    .setTitle('Rental')
    .setDescription('API tests')
    .setVersion('1.0')
    .addTag('rentals')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(9000);
}
bootstrap();
