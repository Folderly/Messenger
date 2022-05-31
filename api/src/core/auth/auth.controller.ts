import { Controller, Get, Post, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly _AuthService: AuthService) {}

  @Post('sign-in')
  async signIn() {
    const redirectUrl = await this._AuthService.signIn();

    return { redirectUrl };
  }

  @Get('finish-sign-in')
  async finishSignIn(
    @Query('code') code: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = await this._AuthService.finishSignIn(code);

    response.cookie('token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    response.redirect(process.env.CLIENT_URL);
  }

  @Post('sign-out')
  async signOut(@Res({ passthrough: true }) response: Response) {
    response.cookie('token', null, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
  }
}
