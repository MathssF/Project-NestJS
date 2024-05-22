import { createConnection } from 'typeorm';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateGenres implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'genres',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'varchar',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('genres');
  }
}

async function runMigration() {
  try {
    // Cria a conexão com o banco de dados
    const connection = await createConnection();

    // Executa a migration
    await connection.runMigrations();

    // Fecha a conexão
    await connection.close();
    
    console.log('Migration executada com sucesso.');
  } catch (error) {
    console.error('Erro ao executar a migration:', error);
  }
}

export async function runMigrationGT() {
  try {
    const connection = await createConnection();

    await connection.runMigrations();

    await connection.close();
    
    console.log('Migration executada com sucesso.');
  } catch (error) {
    console.error('Erro ao executar a migration:', error);
  }
}