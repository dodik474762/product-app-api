import { Test, TestingModule } from '@nestjs/testing';
import { TesmongoController } from './tesmongo.controller';

describe('TesmongoController', () => {
  let controller: TesmongoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TesmongoController],
    }).compile();

    controller = module.get<TesmongoController>(TesmongoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
