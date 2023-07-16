import {
  GoogleOAuthGuard,
  ParseGoogleTokenOAuthGuard
} from '../passport/google/google-oauth.guard';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Request() req) {
    // console.log('req', req);
  }
  @Get('google-token')
  // @UseGuards(AuthGuard('google-verify-token'))
  @UseGuards(ParseGoogleTokenOAuthGuard)
  async googleTokenAuth(@Request() req) {
    return req.user;
  }

  @Post('google')
  @UseGuards(GoogleOAuthGuard)
  async postGoogleAuth(@Request() req) {
    console.log('req', req);
  }

  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Request() req) {
    console.log('ok');
    return this.authService.googleLogin(req);
  }
}
