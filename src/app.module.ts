import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ValidationModule } from './validation/validation.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { APP_GUARD } from '@nestjs/core';
import { WebsocketModule } from './websocket/websocket.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { TesmongoModule } from './test/tesmongo/tesmongo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from './transaction/mail/mail.module';
import { env } from 'process';
import { ProductModule } from './master/product/product.module';
import { ProductClaimModule } from './transaction/product_claim/product_claim.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ValidationModule,
    ValidationModule.forRoot(true),
    WebsocketModule,
    MongooseModule.forRoot(env.MONGO_HOST, {
      dbName: env.MONGO_DB,
    }),
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TesmongoModule,
    MailModule,
    ProductModule,
    ProductClaimModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '/api/users/current',
      method: RequestMethod.GET,
    });
  }
}
