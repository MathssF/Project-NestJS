import { MigrationInterface, QueryRunner, Table } from 'typeorm';

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