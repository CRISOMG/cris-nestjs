import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleOAuthGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext) {
    const activate = (await super.canActivate(context)) as boolean;
    console.log('wtf');
    // const req = context.switchToHttp().getRequest();
    return activate;
  }
}

@Injectable()
export class ParseGoogleTokenOAuthGuard extends AuthGuard(
  'google-verify-token'
) {
  // async canActivate(context: ExecutionContext) {
  //   const activate = (await super.canActivate(context)) as boolean;
  //   console.log('wtf');
  //   // const req = context.switchToHttp().getRequest();
  //   return activate;
  // }
}
