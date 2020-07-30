import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../shared/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async createUser(CreateUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = new this.userModel(CreateUserDto);
      return createdUser.save();
    } catch (e) {
      throw new Error(e);
    }
  }
  async findAllUsers(): Promise<User[]> {
    try {
      return this.userModel.find().exec();
    } catch (e) {
      throw new Error(e);
    }
  }
}
