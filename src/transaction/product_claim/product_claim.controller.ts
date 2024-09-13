import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProductClaimService } from './product_claim.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('api/transaction/product-claim')
export class ProductClaimController {
  constructor(private productClaimService: ProductClaimService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  index() {
    return 'Module Product Claim';
  }

  @UseGuards(JwtAuthGuard)
  @Get('get')
  async get(@Query('search') search: string, @Request() req) {
    const user = await this.productClaimService.validate(req.user);
    const data = await this.productClaimService.findAll(search, user.roles, user.username);
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
    @Body('product_code') product_code: string,
    @Body('id') id: string,
    @Request() req,
  ) {
    const postData = {
      product_name: product_name,
      product_price: product_price,
      waranty_date: waranty_date,
      id: id,
      product_code: product_code,
      created_by: req.user.username,
    };
    const data = await this.productClaimService.create(postData);
    const result = {
      statusCode: 200,
      is_valid: true,
      data: data,
    };

    return result;
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('approve')
  async approve(
    @Body('id') id: string,
    @Body('status') status: string,
    @Request() req,
  ) {
    const postData = {
      id: id,
      status: status,
      approved_date: new Date(),
    };
    const data = await this.productClaimService.create(postData);
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
    const data = await this.productClaimService.delete(id);
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
    const data = await this.productClaimService.details(id);
    const result = {
      statusCode: 200,
      is_valid: true,
      data: data,
    };

    return result;
  }
}
