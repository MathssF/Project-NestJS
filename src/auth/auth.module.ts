import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategys/local.strategy';
import { JwtStrategy } from './strategys/jwt.strategy';
import { LoginValidationMiddleware } from './middlewares/login-validation.middleware';
import { jwtConstants } from './constant/constant';

// Obs: Aqui irá precisar ir no /src/auth/constant/constant.example.ts
// E mudar de constant.example.ts para constant.ts

@Module({
  imports: [
    UserModule, PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      // process.env.JWT_SECRET
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
  }
}

