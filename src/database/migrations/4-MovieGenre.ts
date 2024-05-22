import { MigrationInterface, QueryRunner, Table, createConnection } from 'typeorm';

export class CreateMovieGenre implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'movie_genre',
      columns: [
        {
          name: 'movieId',
          type: 'int',
          isPrimary: true,
        },
        {
          name: 'genreId',
          type: 'int',
          isPrimary: true,
        },
      ],
      foreignKeys: [
        {
          columnNames: ['movieId'],
          referencedTableName: 'movies',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
        },
        {
          columnNames: ['genreId'],
          referencedTableName: 'genres',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('movie_genre');
  }
}

export async function runMigrationMG() {
  try {
    const connection = await createConnection();

    await connection.runMigrations();

    await connection.close();
    
    console.log('Migration executada com sucesso.');
  } catch (error) {
    console.error('Erro ao executar a migration:', error);
  }
}