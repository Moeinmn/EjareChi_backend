import { Module } from '@nestjs/common';
import { RentalController } from './rental.controller';
import { RentalService } from './Rental.service';
import { PrismaModule } from '@app/common';

@Module({
  imports: [PrismaModule],
  controllers: [RentalController],
  providers: [RentalService],
})
export class RentalModule {}
