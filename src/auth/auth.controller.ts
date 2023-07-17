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
    console.log('req', req);
  }
  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Request() req) {
    return this.authService.googleLogin(req);
  }
  @Get('google-token')
  @UseGuards(ParseGoogleTokenOAuthGuard)
  async googleTokenAuth(@Request() req) {
    return req.user;
  }
}
