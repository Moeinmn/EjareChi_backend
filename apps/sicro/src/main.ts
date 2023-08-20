import { NestFactory } from '@nestjs/core';
import { SicroModule } from './sicro.module';

async function bootstrap() {
  const app = await NestFactory.create(SicroModule);
  await app.listen(9000);
}
bootstrap();
