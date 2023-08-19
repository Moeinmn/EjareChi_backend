import { NestFactory } from '@nestjs/core';
import { MicroModule } from './micro.module';
import { Transport , MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(MicroModule,{
    transport: Transport.TCP,
    options: {
      port: 40001,
    },
  });

  // microservice #1
// const microserviceTcp = app.connectMicroservice<MicroserviceOptions>({
//   transport: Transport.TCP,
//   options: {
//     port: 40001,
//   },
// });
// microservice #2
// const microserviceRedis = app.connectMicroservice<MicroserviceOptions>({
//   transport: Transport.REDIS,
//   options: {
//     host: 'localhost',
//     port: 6379,
//   },
// });

  //await app.startAllMicroservices();

  await app.listen();
}
bootstrap();
