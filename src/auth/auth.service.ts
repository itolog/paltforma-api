import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../graphql';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.findUser(username);

    const isPasswordValid: boolean = await bcrypt.compare(password, user.password);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    if (!isPasswordValid) {
      throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
    }
    delete user.password;

    return user;
  }

  async login(user: User): Promise<any> {
    try {
      const payload = { username: user.name, sub: user.id };
      return {
        token: this.jwtService.sign(payload),
      };
    } catch (e) {
      throw new Error(e);
    }
  }
}
