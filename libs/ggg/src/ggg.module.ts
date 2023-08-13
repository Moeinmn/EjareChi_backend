import { Module } from '@nestjs/common';
import { GggService } from './ggg.service';

@Module({
  providers: [GggService],
  exports: [GggService],
})
export class GggModule {}
