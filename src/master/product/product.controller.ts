import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('api/master/product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  index() {
    return 'Module Product Master';
  }

  @UseGuards(JwtAuthGuard)
  @Get('get')
  async get(@Query('search') search: string, @Request() req) {    
    const data = await this.productService.findAll(search);
    const result = {
      statusCode: 200,
      is_valid: true,
      data: data,
    };

    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Post('submit')
  async submit(
    @Body('product_name') product_name: string,
    @Body('product_price') product_price: string,
    @Body('waranty_date') waranty_date: string,
    @Body('id') id: string,
    @Request() req
  ) {
    const postData = {
      product_name: product_name,
      product_price: product_price,
      waranty_date: waranty_date,
      id: id,
      created_by: req.user.username,
    };
    const data = await this.productService.create(postData);
    const result = {
      statusCode: 200,
      is_valid: true,
      data: data,
    };

    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete')
  async delete(@Body('id') id: string) {
    const data = await this.productService.delete(id);
    const result = {
      statusCode: 200,
      is_valid: true,
      data: data,
    };

    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('getDetail')
  async getDetail(@Query('id') id: string) {
    const data = await this.productService.details(id);
    const result = {
      statusCode: 200,
      is_valid: true,
      data: data,
    };

    return result;
  }
}
