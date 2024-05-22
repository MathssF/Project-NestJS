import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
// import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // 
}