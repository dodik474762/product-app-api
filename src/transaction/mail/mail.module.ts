import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { Mail, MailSchema } from 'src/schemas/mail.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [MailService],
  controllers: [MailController],
  imports: [
    MongooseModule.forFeature([{ name: Mail.name, schema: MailSchema }]),
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          // For relay SMTP server set the host to smtp-relay.gmail.com
          // and for Gmail STMO server set it to smtp.gmail.com
          host: 'smtp.gmail.com',
          // For SSL and TLS connection
          secure: true,
          port: 465,
          auth: {
            // Account gmail address
            user: 'dodikra8@gmail.com',
            pass: "jgvi qbpw ylkn broc"
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class MailModule {}
