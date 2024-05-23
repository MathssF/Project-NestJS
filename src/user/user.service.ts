import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserByID(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: {
      id: id }
    });
    if (!user) {
      return undefined;
    }
    return user;
  }

  async getUserByName(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      return undefined;
    }
    return user;
  }

  async createUser(username: string, email: string, password: string): Promise<User> {
    const existingUser = await this.getUserByName(username);
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
    const user = await this.getUserByName(username);
    if (user && await user.validatePassword(password)) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(username: string, password: string): Promise<object> {
    const wasUser = await this.validateUser(username, password);
    const load = {user: username, sub: wasUser.id};
    // const accessToken = await this.jwtService.signAsync(load);
    // console.log('O erro pode estar no auth.service ');
    // return { acess_token: accessToken };
    if(wasUser) {
      return {
        id: wasUser.id,
        User: wasUser.username
      }
    }
  }
}
