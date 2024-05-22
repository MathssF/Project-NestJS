import { Controller, Get } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { runMigrationUT } from 'src/database/migrations/1-UsersTable';
import { runMigrationGT } from 'src/database/migrations/2-GenresTable';
import { runMigrationMT } from 'src/database/migrations/3-MoviesTable';
import { runMigrationMG } from 'src/database/migrations/4-MovieGenre';
import { runMigrationRT } from 'src/database/migrations/5-RatingsTable';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('user-table')
  async runMigrationUT(): Promise<string> {
    try {
      await runMigrationUT();
      return 'Migration executada com sucesso.';
    } catch (error) {
      console.error('Erro ao executar a migration:', error);
      return 'Erro ao executar a migration.';
    }
  }
  @Get('genre-table')
  async runMigrationGT(): Promise<string> {
    try {
      await runMigrationGT();
      return 'Migration executada com sucesso.';
    } catch (error) {
      console.error('Erro ao executar a migration:', error);
      return 'Erro ao executar a migration.';
    }
  }
  @Get('movie-table')
  async runMigrationMT(): Promise<string> {
    try {
      await runMigrationMT();
      return 'Migration executada com sucesso.';
    } catch (error) {
      console.error('Erro ao executar a migration:', error);
      return 'Erro ao executar a migration.';
    }
  }
  @Get('movie-genre')
  async runMigrationMG(): Promise<string> {
    try {
      await runMigrationMG();
      return 'Migration executada com sucesso.';
    } catch (error) {
      console.error('Erro ao executar a migration:', error);
      return 'Erro ao executar a migration.';
    }
  }
  @Get('rating-table')
  async runMigrationRT(): Promise<string> {
    try {
      await runMigrationRT();
      return 'Migration executada com sucesso.';
    } catch (error) {
      console.error('Erro ao executar a migration:', error);
      return 'Erro ao executar a migration.';
    }
  }
}