import { Module } from '@nestjs/common';
import { TesmongoController } from './tesmongo.controller';
import { TesmongoService } from './tesmongo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  controllers: [TesmongoController],
  providers: [TesmongoService],
  imports: [
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema,
    }]),
  ],
})
export class TesmongoModule {}
