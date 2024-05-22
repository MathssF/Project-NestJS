import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRatings implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'ratings',
      columns: [
        {
          name: 'userId',
          type: 'int',
          isPrimary: true,
        },
        {
          name: 'movieId',
          type: 'int',
          isPrimary: true,
        },
        {
          name: 'rating',
          type: 'int',
        },
      ],
      foreignKeys: [
        {
          columnNames: ['userId'],
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
        },
        {
          columnNames: ['movieId'],
          referencedTableName: 'movies',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ratings');
  }
}
