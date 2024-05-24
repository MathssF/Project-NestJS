import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// // import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';
import { LocalStrategy } from './strategys/local.strategy';
// // import { JwtInterceptor } from './jwt.interceptor';
// import { AuthGuard } from './auth.guard';
// import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
//       global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, LocalStrategy,
    // {
    // provide: APP_GUARD,
    // useClass: AuthGuard,
//    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
