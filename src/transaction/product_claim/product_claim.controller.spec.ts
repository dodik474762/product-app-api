import { Test, TestingModule } from '@nestjs/testing';
import { ProductClaimController } from './product_claim.controller';

describe('ProductClaimController', () => {
  let controller: ProductClaimController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductClaimController],
    }).compile();

    controller = module.get<ProductClaimController>(ProductClaimController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
