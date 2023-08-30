import { Controller, Get } from '@nestjs/common';
import { MicroService } from './micro.service';
import { Transport , MessagePattern , Ctx , Payload} from '@nestjs/microservices';


@Controller()
export class MicroController {
  constructor(private readonly microService: MicroService) { }

  @Get()
  getHello(): string {
    return this.microService.getHello();
  }

  // @MessagePattern({ cmd: 'time' }, Transport.TCP)
  // getTCPDate(@Payload() data: any , @Ctx() context: any) {
  //   console.log(111 , data);
  //   console.log(222, context)
    
  //   return new Date()
  // }
  @MessagePattern({ cmd: 'create_product' }, Transport.TCP)
  async createProduct(@Payload() data: any , @Ctx() context: any) {
    console.log(111 , data);
    console.log(222, context)
    return new Date();
  }
}
