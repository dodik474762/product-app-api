import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class TesmongoService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectConnection() private connection : Connection
    ) {}


    async findAll() : Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async create() : Promise<any> {
        const user = new this.userModel({
            username: 'test',
            password: 'test',
            role: 'admin',
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: new Date(),
        });

        return await user.save();
    }

    async update(): Promise<any> {
        const user = await this.userModel.findOne({username: 'test'});
        user.username = 'test2';
        return await user.save();
    }
}
