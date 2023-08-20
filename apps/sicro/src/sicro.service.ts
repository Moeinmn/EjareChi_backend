import { Injectable } from '@nestjs/common';

@Injectable()
export class SicroService {
  getHello(): string {
    return 'Hello World!';
  }
}
