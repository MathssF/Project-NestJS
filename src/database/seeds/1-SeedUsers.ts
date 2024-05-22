import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcryptjs';

export class SeedUserTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const usersData = [
      { username: 'MathssF', email: 'Maths.aki@gmail.com', password: 'Developer', authority: { vote: true, edit: true, add: true, del: true } },
      { username: 'MKS-Visitante', email: 'visitante@example.com', password: 'senha123', authority: { vote: false, edit: false, add: false, del: false } },
      { username: 'MKS-Admin', email: 'admin@example.com', password: 'admin123', authority: { vote: true, edit: true, add: true, del: true } },
      { username: 'Usuario3', email: 'usuario3@example.com', password: 'senha123', authority: { vote: true, edit: false, add: false, del: false } },
      { username: 'Usuario4', email: 'usuario4@example.com', password: 'senha123', authority: { vote: true, edit: false, add: false, del: false } },
      { username: 'Usuario5', email: 'usuario5@example.com', password: 'senha123', authority: { vote: true, edit: false, add: false, del: false } },
      { username: 'Usuario6', email: 'usuario6@example.com', password: 'senha123', authority: { vote: true, edit: false, add: false, del: false } },
      { username: 'Usuario7', email: 'usuario7@example.com', password: 'senha123', authority: { vote: true, edit: false, add: false, del: false } },
      { username: 'Usuario8', email: 'usuario8@example.com', password: 'senha123', authority: { vote: true, edit: false, add: false, del: false } },
      { username: 'Usuario9', email: 'usuario9@example.com', password: 'senha123', authority: { vote: true, edit: false, add: false, del: false } },
      { username: 'Usuario10', email: 'usuario10@example.com', password: 'senha123', authority: { vote: true, edit: false, add: false, del: false } },
      { username: 'Usuario11', email: 'usuario11@example.com', password: 'senha123', authority: { vote: true, edit: false, add: false, del: false } },
      { username: 'Usuario12', email: 'usuario12@example.com', password: 'senha123', authority: { vote: true, edit: false, add: false, del: false } },
      { username: 'Usuario13', email: 'usuario13@example.com', password: 'senha123', authority: { vote: true, edit: false, add: false, del: false } },
      
    ];

    const userRepository = getRepository(User);

    for (const userData of usersData) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const newUser = userRepository.create({
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        authority: userData.authority,
      });

      await userRepository.save(newUser);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM users');
  }
}
