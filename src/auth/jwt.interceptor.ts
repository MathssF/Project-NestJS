// // jwt.interceptor.ts

// import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class JwtInterceptor implements NestInterceptor {
//   constructor(private jwtService: JwtService) {}

//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     const request = context.switchToHttp().getRequest();
//     const authorization = request.headers['authorization'];
//     if (!authorization || !authorization.startsWith('Bearer ')) {
//       throw new UnauthorizedException('Invalid authorization header');
//     }
//     const token = authorization.substring(7);
//     const decoded = this.jwtService.decode(token) as { sub: number; username: string };
//     request.userId = decoded.sub;
//     return next.handle();
//   }
// }
