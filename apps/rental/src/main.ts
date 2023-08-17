import { NestFactory } from '@nestjs/core';
import { RentalModule } from './rental.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { PrismaService } from '@app/common/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(RentalModule);

  const configService = app.get(ConfigService)

  app.enableCors();

  //Enabling versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useLogger(app.get(Logger , {strict : false}))

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  
  //Enabling Prisma
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const PORT = configService.get("HTTP_PORT");
  console.log(PORT);

  await app.listen(5000);
}
bootstrap();
