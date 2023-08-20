import { Module } from '@nestjs/common';
import { SicroController } from './sicro.controller';
import { SicroService } from './sicro.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'micro', transport: Transport.TCP , options:{
        port : 40001
      }},
    ]),
  ],
  controllers: [SicroController],
  providers: [SicroService],
})
export class SicroModule {}
