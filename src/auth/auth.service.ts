import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectConnection() private connection: Connection,
  ) {}

  async getAksesMenu(id: number, module: string): Promise<any> {
    return [];
  }

  async login(user) {
    const tokenLogin = this.jwtService.sign(user);
    return tokenLogin;
  }

  async create(params) : Promise<any> {
    const data = params;
    const user = new this.userModel(data);
    user.created_at = new Date();
    user.updated_at = new Date();    

    return await user.save();
}

  async update(username) {
    const data = await this.userModel.findOne({ username: username });
    data.updated_at = new Date();
    return await data.save();
  }

  async updatePassword(username, hashPassword) {
    const data = await this.userModel.findOne({ username: username });
    data.password = hashPassword;
    return await data.save();
  }

  async validate(payload) {
    const data = await this.userModel.findOne({ username: payload.username });
    return data;
  }
}
