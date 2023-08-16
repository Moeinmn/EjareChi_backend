import { Controller, Get } from '@nestjs/common';
import { RentalService } from './rental.service';

@Controller()
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Get()
  getHello(): string {
    return this.rentalService.getHello();
  }
}
