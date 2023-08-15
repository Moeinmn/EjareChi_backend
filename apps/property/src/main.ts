import { NestFactory } from '@nestjs/core';
import { PropertyModule } from './property.module';

async function bootstrap() {
  const app = await NestFactory.create(PropertyModule);
  await app.listen(3000);
}
bootstrap();
