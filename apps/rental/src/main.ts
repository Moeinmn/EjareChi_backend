import { NestFactory } from '@nestjs/core';
import { RentalModule } from './rental.module';

async function bootstrap() {
  const app = await NestFactory.create(RentalModule);
  await app.listen(3000);
}
bootstrap();
