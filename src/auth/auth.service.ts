import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from '../shared/schemas/user.schema';
import { CreateUserDto } from '../shared/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.userModel.findOne({name: username});
  //   if (user && user.password === pass) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  async registration(data: CreateUserDto): Promise<any> {
    data.password = await bcrypt.hash(data.password, 10);
    try {
      const createdUser = new this.userModel(data);
      return await createdUser.save();
    } catch (e) {
      throw new Error(e);
    }
  }

  async update(data: { id: string; url: string }): Promise<any> {
    try {
        await this.userModel
        .updateOne({ _id: data.id }, { avatar: data.url })
        .exec();

      return 'User Avatar success updated';
    } catch (e) {
      throw new Error(e);
    }
  }

  // async login(): Promise<any> {
  //   try {
  //     const users = this.userModel.find().exec();
  //     return users;
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }
}
