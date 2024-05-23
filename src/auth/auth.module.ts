import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
// import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';
import { JwtInterceptor } from './jwt.interceptor';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, JwtInterceptor],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
