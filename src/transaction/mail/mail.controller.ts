import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MailService } from './mail.service';
import { Mail } from 'src/schemas/mail.schema';

@Controller('api/transaction/mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Get('/')
  index() {
    return 'Module Mail';
  }

  @Get('get')
  async get(
    @Query('search') search:string,
  ) {
    const data = await this.mailService.findAll(search);
    const result = {
      statusCode: 200,
      is_valid: true,
      data: data,
    };

    return result;
  }

  @Post('submit')
  async submit(
    @Body("username") username: string,
    @Body("email") email: string,
    @Body("date") date: string,
    @Body("description") description: string,    
    @Body("id") id: string,    
  ) {
    const postData = {
      username: username,
      email: email,
      date: date,
      description: description,
      id: id,
    };
    const data = await this.mailService.create(postData);
    const result = {
      statusCode: 200,
      is_valid: true,
      data : data
    };

    return result;
  }
 
  @Post('delete')
  async delete(  
    @Body("id") id: string,    
  ) {
    const data = await this.mailService.delete(id);
    const result = {
      statusCode: 200,
      is_valid: true,
      data : data
    };

    return result;
  }
  
  @Get('getDetail')
  async getDetail(  
    @Query("id") id: string,    
  ) {
    const data = await this.mailService.details(id);
    const result = {
      statusCode: 200,
      is_valid: true,
      data : data
    };

    return result;
  }

  // @Get('sendMail')
  // sendMail() {
  //   const data = this.mailService.sendMail();
  //   return data;
  // }
}
