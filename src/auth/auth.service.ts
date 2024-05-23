import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

function removeBearerPrefix(tokenWithBearer: string): string {
  console.log('Entrou na funçã de remover o Bearer');
  if (tokenWithBearer.startsWith("Bearer ")) {
      console.log('Removeu!');
      return tokenWithBearer.slice(7);
  } else {
      console.log('Não precisou remover pois não tinha!');
      return tokenWithBearer;
  }
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(username: string, email: string, password: string): Promise<User> {
    const existingUser = await this.userService.getUserByName(username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });
    return this.userRepository.save(newUser);
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.getUserByName(username);
    if (user && await user.validatePassword(password)) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(username: string, password: string): Promise<object> {
    const wasUser = await this.validateUser(username, password);
    const load = {user: username, sub: wasUser.id};
    const accessToken = await this.jwtService.signAsync(load);
    console.log('O erro pode estar no auth.service ');
    return { acess_token: accessToken };
  }
  

  async getUserIdFromToken(token: string): Promise<number | null> {
    console.log('entrou no Get User Id From Token, com o seguinte token: ', token, 'É isto');

    const newToken = removeBearerPrefix(token)
    console.log('New Token... ', newToken)
    try {
      console.log('Entrou no Try');
      const decodedToken = await this.jwtService.verifyAsync(newToken);
      console.log('Decoded: ', decodedToken);
      if (decodedToken && typeof decodedToken === 'object' && 'sub' in decodedToken) {
        return decodedToken.sub; // 'sub' é uma convenção JWT para o user id
      }
      return null; // Retorne null se não conseguir extrair o user id do token
    } catch (error) {
      console.error('Erro ao verificar o token:', error.message);
      return null; // Retorne null se houver um erro ao verificar o token
    }
  }
}
