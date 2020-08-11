import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from '../shared/schemas/user.schema';

import { CreateUserInput } from '../graphql';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    try {
      createUserInput.password = await bcrypt.hash(createUserInput.password, 10);
      const createdUser = new this.userModel(createUserInput);
      return await createdUser.save();
    } catch (e) {
      throw new Error(e);
    }
  }

  async findUser(name: string): Promise<User> {
    const user = await this.userModel.findOne({ name });
    if (!user) {
      throw new HttpException(`Пользователь не найден!`, HttpStatus.BAD_REQUEST);
    }
    return user;
  }


  async findAllUsers(): Promise<User[]> {
    try {
      return await this.userModel.find().exec();
    } catch (e) {
      throw new Error(e);
    }
  }
}
