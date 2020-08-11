import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoggedUser } from '../graphql';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {
  }

  @Query()
  async login(@Args('username') username: string, @Args('password') pass: string): Promise<LoggedUser> {
    try {
      const user = await this.authService.validateUser(username, pass);

      const token = await this.authService.login(user);

      return {
        user,
        ...token,
      };
    } catch (e) {
      return e;
    }
  }
}
