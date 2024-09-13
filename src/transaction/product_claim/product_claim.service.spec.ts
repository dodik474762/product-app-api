import { Test, TestingModule } from '@nestjs/testing';
import { ProductClaimService } from './product_claim.service';

describe('ProductClaimService', () => {
  let service: ProductClaimService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductClaimService],
    }).compile();

    service = module.get<ProductClaimService>(ProductClaimService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
