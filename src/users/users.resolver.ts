import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UsersService } from './users.service';
import { CreateUserInput, User } from '../graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/jwt-auth.guard';

@Resolver('Users')
export class UsersResolver {
  constructor(private usersService: UsersService) {
  }

  @Query()
  async user(@Args('name') name: string): Promise<User> {
    try {
      return await this.usersService.findUser(name);
    } catch (e) {
      return e;
    }
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  async users(): Promise<User[]> {
    try {
      return await this.usersService.findAllUsers();
    } catch (e) {
      return e;
    }
  }


  @Mutation()
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    try {
      return await this.usersService.createUser(createUserInput);
    } catch (e) {
      return e;
    }
  }

}
