// import {
//   CanActivate, ExecutionContext, Injectable, UnauthorizedException
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// // import { AuthGuard } from '@nestjs/passport';
// import { Request } from 'express';
// import { Observable } from 'rxjs';

import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    // #Verificar se o Usuario esta correto Login e Senha
    if (err) {
      console.log('Auth Guard');
      throw err || new UnauthorizedException('O erro esta no err do Authguard');
// export class JwtAuthGuard implements CanActivate {
//   constructor(
//     private jwtService: JwtService
//   ) {}
  
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const token = this.extractTokenFromHeader(request);
//     if (!token) {
//       throw new UnauthorizedException('Não autorizado no AuthGuard');
    }
    if (info?.exp && info.exp * 1000 < Date.now()) {
      throw new UnauthorizedException('Token expired');
    // try {
    //   const payload = await this.jwtService.verifyAsync(
    //     token,
    //     {
    //       secret: 'MeContrata',
    //     }
    //   );
    //   // 💡 We're assigning the payload to the request object here
    //   // so that we can access it in our route handlers
    //   request['user'] = payload;
    // } catch {
    //   throw new UnauthorizedException('Erro pelo authGuard canActivate');
    // }
    // return true;
    return user
  }
  
  // private extractTokenFromHeader(request: Request): string | undefined {
  //   const [type, token] = request.headers.authorization?.split(' ') ?? [];
  //   return type === 'Bearer' ? token : undefined;
  // }
}
}