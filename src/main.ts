import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as mustache from 'mustache-express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ValidationFilter } from './validation/validation.filter';
import { join } from 'path';
// import { RequestMethod } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {cors: true});
  
  app.use(cookieParser('SECRET COOKIE'));
  app.set('views', __dirname + '/../views');
  app.set('view engine', 'html');
  app.engine('html', mustache());
  const configService = app.get(ConfigService);

  app.useGlobalFilters(new ValidationFilter());
  const dirAssets = join(__dirname, '..', 'public');
  app.useStaticAssets(dirAssets);

  await app.listen(configService.get('PORT_URL'));

}
bootstrap();
