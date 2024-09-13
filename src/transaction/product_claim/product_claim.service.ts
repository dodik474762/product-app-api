import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ProductClaim } from 'src/schemas/product_claim.schema';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class ProductClaimService {
  constructor(
    @InjectModel(ProductClaim.name)
    private productClaimModel: Model<ProductClaim>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectConnection() private connection: Connection,
  ) {}

  async findAll(
    search: string,
    roles: String,
    username: String,
  ): Promise<ProductClaim[]> {
    if (roles == 'staff') {
      return await this.productClaimModel
        .find({ product_name: { $regex: search, $options: 'i' } })
        .exec();
    }

    return await this.productClaimModel
      .find({
        $and: [
          { product_name: { $regex: search, $options: 'i' } },
          { created_by: username },
        ],
      })
      .exec();
  }

  async create(postData: any): Promise<any> {
    let data = null;
    if (
      postData.id === undefined ||
      postData.id === null ||
      postData.id === ''
    ) {
      delete postData.id;
      postData.created_at = new Date();
      postData.updated_at = new Date();
      postData.approved_date = null;
      data = new this.productClaimModel(postData);
      data = await data.save();
    } else {
      postData.updated_at = new Date();
      const id = postData.id;
      delete postData.id;
      data = await this.productClaimModel.findOneAndUpdate(
        { _id: id },
        postData,
        {
          new: true,
        },
      );
    }

    return data;
  }

  async delete(id: string): Promise<any> {
    return await this.productClaimModel.deleteOne({ _id: id });
  }

  async details(id: string): Promise<any> {
    return await this.productClaimModel.findOne({ _id: id });
  }

  async validate(payload) {
    const data = await this.userModel.findOne({ username: payload.username });
    return data;
  }
}
