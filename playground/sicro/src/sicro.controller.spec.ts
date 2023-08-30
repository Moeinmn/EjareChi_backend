import { Test, TestingModule } from '@nestjs/testing';
import { SicroController } from './sicro.controller';
import { SicroService } from './sicro.service';

describe('SicroController', () => {
  let sicroController: SicroController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SicroController],
      providers: [SicroService],
    }).compile();

    sicroController = app.get<SicroController>(SicroController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(sicroController.getHello()).toBe('Hello World!');
    });
  });
});
