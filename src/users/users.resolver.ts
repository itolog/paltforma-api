import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UsersService } from './users.service';
import { CreateUserInput, UserInput, User } from '../graphql';

import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/jwt-auth.guard';

@Resolver('Users')
export class UsersResolver {
  constructor(private usersService: UsersService) {
  }

  @Query()
  @UseGuards(GqlAuthGuard)
  async user(@Args('name') name: string): Promise<User> {
    try {
      return await this.usersService.findUser(name);
    } catch (e) {
      return e;
    }
  }

  @Query()
  // @UseGuards(GqlAuthGuard)
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

  @Mutation()
  async deleteUser(@Args('id') id: string): Promise<string> {
    try {
      return await this.usersService.deleteUser(id);
    } catch (e) {
      return e;
    }
  }

  @Mutation()
  async updateUser(@Args('id') id: string, @Args('user') user: UserInput): Promise<string> {
    try {
      return await this.usersService.updateUser(id, user);
    } catch (e) {
      return e;
    }
  }

}
