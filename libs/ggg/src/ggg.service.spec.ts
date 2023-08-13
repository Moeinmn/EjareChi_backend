import { Test, TestingModule } from '@nestjs/testing';
import { GggService } from './ggg.service';

describe('GggService', () => {
  let service: GggService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GggService],
    }).compile();

    service = module.get<GggService>(GggService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
