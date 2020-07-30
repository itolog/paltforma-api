import { Args, Resolver, Mutation } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../shared/dto/create-user.dto';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation('registration')
  async registration(
    @Args('createUserInput') data: CreateUserDto,
  ): Promise<any> {
    // console.log('from resolve', data );
    return await this.authService.registration(data);
  }

  @Mutation('updateUserAvatar')
  async updateUserAvatar(
    @Args('updateUserAvatarInput') data: { id: string; url: string },
  ): Promise<any> {
    return await this.authService.update(data);
  }
}
