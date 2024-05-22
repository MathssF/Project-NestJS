import { MigrationInterface, QueryRunner, Table, createConnection } from 'typeorm';

export class CreateMovies implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'movies',
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
        {
          name: 'description',
          type: 'varchar',
        },
        {
          name: 'release_data',
          type: 'varchar',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('movies');
  }
}


export async function runMigrationMT() {
  try {
    const connection = await createConnection();

    await connection.runMigrations();

    await connection.close();
    
    console.log('Migration executada com sucesso.');
  } catch (error) {
    console.error('Erro ao executar a migration:', error);
  }
}