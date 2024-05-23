import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
// import { UserRepository } from 'src/user/entities/user.repository';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  async login(username: string, password: string): Promise<{
    access_token: {load: string, expiresTime: number}
  }> {
    const wasUser = await this.validateUser(username, password);
    const load = {user: username, sub: wasUser.id};
    const expiresIn = process.env.JWT_EXPIRES_IN;
    const accessToken = await this.jwtService.signAsync(load, { expiresIn });
    console.log('O erro pode estar no auth.service ');
    return {
      access_token: {
        load: accessToken,
        expiresTime: expiresIn ? parseInt(expiresIn, 10) : 3600,
      }
    }
  }
}
