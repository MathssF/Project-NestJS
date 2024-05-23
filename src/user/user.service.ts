import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
// import { DataSource } from 'typeorm';
// import { UserRepository } from './entities/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    // private readonly dataSource: DataSource,
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

  // async testConnection(): Promise<string> {
  //   try {
  //     const queryRunner = this.dataSource.createQueryRunner();
  //     await queryRunner.connect();

  //     const tableExists = await queryRunner.hasTable('user'); // Nome da tabela a verificar

  //     await queryRunner.release();

  //     if (tableExists) {
  //       return 'The table "user" exists!';
  //     } else {
  //       return 'The table "user" does not exist!';
  //     }
  //   } catch (error) {
  //     console.error('Database connection failed:', error);
  //     return 'Database connection failed!';
  //   }
  // }
}
