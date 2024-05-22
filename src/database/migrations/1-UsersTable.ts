import { createConnection } from 'typeorm';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'serial',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'username',
          type: 'varchar',
          isUnique: true,
        },
        {
          name: 'password',
          type: 'varchar',
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true,
        },
        {
          name: 'authority',
          type: 'jsonb',
          default: "'{\"vote\": false, \"edit\": false, \"add\": false, \"del\": false}'",
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}


export async function runMigrationUT() {
  try {
    const connection = await createConnection();

    await connection.runMigrations();

    await connection.close();
    
    console.log('Migration executada com sucesso.');
  } catch (error) {
    console.error('Erro ao executar a migration:', error);
  }
}