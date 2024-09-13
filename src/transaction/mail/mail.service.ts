import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Mail } from 'src/schemas/mail.schema';

@Injectable()
export class MailService {
  constructor(
    @InjectModel(Mail.name) private mailModel: Model<Mail>,
    @InjectConnection() private connection: Connection,
    private readonly mailerService: MailerService,
  ) {}

  async findAll(search: string): Promise<Mail[]> {
    return await this.mailModel
      // .find()
      .find({ email: { $regex: '^' + search, $options: 'i' } })
      .exec();
  }

  async create(postData: any): Promise<any> {
    let mail = null;
    if (
      postData.id === undefined ||
      postData.id === null ||
      postData.id === ''
    ) {
      delete postData.id;
      postData.created_at = new Date();
      postData.updated_at = new Date();
      mail = new this.mailModel(postData);
      mail = await mail.save();

      this.sendMail(postData.email, postData.description);
    } else {
      postData.updated_at = new Date();
      const id = postData.id;
      delete postData.id;
      mail = await this.mailModel.findOneAndUpdate({ _id: id }, postData, {
        new: true,
      });
    }

    return mail;
  }

  async delete(id: string): Promise<any> {
    return await this.mailModel.deleteOne({ _id: id });
  }

  async details(id: string): Promise<any> {
    return await this.mailModel.findOne({ _id: id });
  }

  async sendMail(to, message) {
    try {
      await this.mailerService.sendMail({
        to: to,
        from: 'dodikra8@gmail.com', // sender address
        subject: 'Test Email', // Subject line
        text: '', // plaintext body
        html: '<p>'+message+'</p>',
      });
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  }
}
