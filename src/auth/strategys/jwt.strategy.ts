import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserFromJwt } from 'src/models/UserFromJwt';
import { UserPayload } from 'src/models/UserPayload';
import { jwtConstants as jwt1 } from '../constant/constant';
import { jwtConstants as jwt2 } from '../constant/constant.example';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // secretOrKey: process.env.JWT_SECRET,
      secretOrKey: jwt1.secret || jwt2.secret,
    });
  }

  async validate(payload: UserPayload): Promise<UserFromJwt> {
    console.log('Entrou no validador da estratégia: ', payload);
    return {
      id: payload.sub,
      email: payload.email,
      username: payload.username,
    };
  }
}