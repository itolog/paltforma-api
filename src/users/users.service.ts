import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from './schemas/user.schema';

import { CreateUserInput, UserInput } from '../graphql';

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

  async deleteUser(id: string): Promise<string> {
    try {
      await this.userModel.deleteOne({ _id: id });
      return `пользователь с id['${id}'] успешно удалён`;
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateUser(id: string, user: UserInput): Promise<string> {
    try {
      await this.userModel.updateOne({ _id: id }, user);
      return `пользователь с id['${id}'] успешно обновлён`;
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
