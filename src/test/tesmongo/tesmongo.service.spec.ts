import { Test, TestingModule } from '@nestjs/testing';
import { TesmongoService } from './tesmongo.service';

describe('TesmongoService', () => {
  let service: TesmongoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TesmongoService],
    }).compile();

    service = module.get<TesmongoService>(TesmongoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
