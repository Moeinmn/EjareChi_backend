import { Injectable } from '@nestjs/common';

@Injectable()
export class RentalService {
  getHello(): string {
    return 'Hello World!';
  }
}
