import { Controller, Get , Inject} from '@nestjs/common';
import { SicroService } from './sicro.service';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class SicroController {
  constructor(
    private readonly sicroService: SicroService,
    @Inject('micro') private client: ClientProxy,
    ) {}

  @Get()
  getHello(): Observable<number> {
    console.log(124);
    
    const pattern = { cmd: 'create_product' };
    const payload = [1, 2, 3];
    return this.client.send<number>(pattern, payload);;
  }
}
