import { AuthService } from './auth.service';
import { Controller, Get, Req, UseGuards, Render } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

interface IReq extends Request {
  profile: any;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  auth(): string {
    return 'auth page';
  }
}
