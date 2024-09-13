import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Product } from 'src/schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectConnection() private connection: Connection,
  ) {}

  async findAll(search: string): Promise<Product[]> {
    return await this.productModel
      .find({ product_name: { $regex: search, $options: 'i' } })
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
      const productCode = await this.productModel.findOne({}).sort({ _id: -1 });
      if (productCode) {        
          postData.product_code = parseInt(productCode.product_code) + 1;
      }else{
        postData.product_code = 1;
      }

      postData.created_at = new Date();
      postData.updated_at = new Date();
      data = new this.productModel(postData);
      data = await data.save();
    } else {
      postData.updated_at = new Date();
      const id = postData.id;
      delete postData.id;
      data = await this.productModel.findOneAndUpdate({ _id: id }, postData, {
        new: true,
      });
    }

    return data;
  }

  async delete(id: string): Promise<any> {
    return await this.productModel.deleteOne({ _id: id });
  }

  async details(id: string): Promise<any> {
    return await this.productModel.findOne({ _id: id });
  }
}
