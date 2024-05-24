// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UserService } from 'src/user/user.service';
// import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcryptjs';

// @Injectable()
// export class AuthService {
//   constructor(
//     private userService: UserService,
//     private jwtService: JwtService
//   ) {}

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
// }