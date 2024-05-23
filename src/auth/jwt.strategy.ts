import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'MeContrata',
    });
  }

  async validate({username, password}: JwtPayload) {
    const user = await this.authService.validateUser(username, password);
    console.log('O erro pode estar no jwt strategy');
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
