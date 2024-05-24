import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  
  @Injectable()
  export class LocalAuthGuard extends AuthGuard('local') {
    canActivate(context: ExecutionContext) {
      return super.canActivate(context);
    }
  
    handleRequest(err, user) {
    //   if (err || !user) {
    //     throw new UnauthorizedException(err?.message);
    //   } // Aqui usamos ambos, deixei separado para o processo de desenvolvimento
      if (err) {
        throw new UnauthorizedException(err?.message);
      }

      if (!user) {
        throw new UnauthorizedException('Need user');
      }
  
      return user;
    }
  }