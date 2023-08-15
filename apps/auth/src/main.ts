import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  app.useLogger(app.get(Logger , {strict : false}))
  
  const configService = app.get(ConfigService)
  
  

  const PORT = configService.get("HTTP_PORT");
  console.log(PORT);
  

  await app.listen(PORT);
}
bootstrap();
