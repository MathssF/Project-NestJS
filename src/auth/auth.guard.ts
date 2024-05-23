import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any) {
    // #Verificar se o Usuario esta correto Login e Senha
    if (err) {
      console.log('Auth Guard');
      throw err || new UnauthorizedException('O erro esta no err do Authguard');
    }

    // if (!user) {
    //   throw err || new UnauthorizedException('User inválido no AuthGuard');
    // }

    // #Verificar se o Token ainda esta ativo 
    if (info?.exp && info.exp * 1000 < Date.now()) {
      throw new UnauthorizedException('Token expired');
    }

    return user;
  }
}
