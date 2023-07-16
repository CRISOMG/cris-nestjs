import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  GoogleStrategy,
  ParseGoogleTokenStrategy
} from 'src/passport/google/google.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, ParseGoogleTokenStrategy]
})
export class AuthModule {}
