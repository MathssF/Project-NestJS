import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedError } from './errors/unauthorized.error';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/entities/user.entity';
import { UserToken } from 'src/models/UserToken';
import { UserPayload } from 'src/models/UserPayload';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(user: User): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.username,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getUserByName(username);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new UnauthorizedError(
      'Email address or password provided is incorrect.',
    );
  }

//   async signIn(
//     username: string,
//     password: string,
//   ): Promise<{ access_token: string }> {
//     console.log('Entrou no User');
//     const user = await this.userService.getUserByName(username);
//     console.log('User:...  ', user);
//     if (!user) {
//       throw new UnauthorizedException('Usuário não encontrado');
//     }

//     // Verifica se a senha fornecida coincide com o hash armazenado
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       throw new UnauthorizedException('Senha inválida');
//     }
//     const payload = { sub: user.id, username: user.username };
//     return {
//       access_token: await this.jwtService.signAsync(payload),
//     };
//   }
}