import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    // #Verificar se o Usuario esta correto Login e Senha
    if (err) {
      console.log('Auth Guard');
      throw err || new UnauthorizedException('O erro esta no err do Authguard');
    }
    if (info?.exp && info.exp * 1000 < Date.now()) {
      throw new UnauthorizedException('Token expired');
    }

    return user;
  }
}
