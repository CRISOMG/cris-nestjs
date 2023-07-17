import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { Strategy as TokenStrategy } from 'passport-google-verify-token';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // callbackURL: 'http://localhost:8000/auth/google/callback',
      callbackURL: 'http://localhost:3000/google/callback',
      scope: ['email', 'profile']
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
      refreshToken
    };
    console.log(user);
    done(null, user);
  }
}

@Injectable()
export class ParseGoogleTokenStrategy extends PassportStrategy(
  TokenStrategy,
  'google-verify-token'
) {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:8000/google/callback',
      scope: ['email', 'profile']
    });
  }
  async validate(parsedToken, googleId, done: VerifyCallback): Promise<any> {
    const { name, email, picture } = parsedToken;
    const user = {
      email,
      name,
      picture,
      googleId
    };
    console.log(user);
    done(null, user);
  }
}

// import { Inject, Injectable } from '@nestjs/common';
// import { ConfigType } from '@nestjs/config';
// import { PassportStrategy } from '@nestjs/passport';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import config from '../../config/config';
// import { User } from '../../users/entities/user.entity';
// import { Strategy, VerifyCallback } from 'passport-google-oauth2';

// @Injectable()
// export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
//   constructor(
// @Inject(config.KEY) private configService: ConfigType<typeof config>,
// @InjectRepository(User) private userRepository: Repository<User>,
//   ) {
//     super({
//       clientID: configService.google.clientID,
//       clientSecret: configService.google.clientSecret,
//       callbackURL: configService.google.callbackURL,
//       scope: ['profile', 'email'],
//     });
//   }

//   async validate(
//     _accessToken: string,
//     _refreshToken: string,
//     profile: any,
//     done: VerifyCallback,
//   ): Promise<any> {
//     const { id, name, emails, photos } = profile;

//     const user = {
//       provider: 'google',
//       providerId: id,
//       email: emails[0].value,
//       name: `${name.givenName} ${name.familyName}`,
//       picture: photos[0].value,
//     };

//     done(null, user);
//   }
// }
