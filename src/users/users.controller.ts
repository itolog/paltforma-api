import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../shared/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }
  @Post()
  async create(@Body() CreateUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.usersService.createUser(CreateUserDto);
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
