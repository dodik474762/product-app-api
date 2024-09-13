import { Module } from '@nestjs/common';
import { ProductClaimController } from './product_claim.controller';
import { ProductClaimService } from './product_claim.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductClaim, ProductClaimSchema } from 'src/schemas/product_claim.schema';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  controllers: [ProductClaimController],
  providers: [ProductClaimService],
  imports: [
    MongooseModule.forFeature([
      {
        name: ProductClaim.name,
        schema: ProductClaimSchema
      },
      {
        name: User.name,
        schema: UserSchema
      },

    ])
  ],
})
export class ProductClaimModule {}
