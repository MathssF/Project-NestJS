import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
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
    console.log('Entrou no AuthService');
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };

    console.log('Payload: ... ', payload);

    const testToken = this.jwtService.sign(payload);
    console.log('Teste Token: ', testToken);

    return {
    //   access_token: this.jwtService.sign(payload),
      access_token: testToken,
    };
  }
  
  async validateUser(username: string, password: string): Promise<any> {
    console.log('Entrou na validação de senha');
    const user = await this.userService.getUserByName(username);

    if (user) {
      console.log('Começou a validar a senha!');
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        console.log('Não encontrou nenhum problema na validação da senha');
        console.log('User: ', {
          ...user,
          password: undefined,
        })
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