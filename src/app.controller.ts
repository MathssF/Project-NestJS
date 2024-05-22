import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { runMigrationUT } from 'src/database/migrations/1-UsersTable';
import { runMigrationGT } from 'src/database/migrations/2-GenresTable';
import { runMigrationMT } from 'src/database/migrations/3-MoviesTable';
import { runMigrationMG } from 'src/database/migrations/4-MovieGenre';
import { runMigrationRT } from 'src/database/migrations/5-RatingsTable';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  private async runMigration(migrationFunction: () => Promise<void>): Promise<string> {
    try {
      await migrationFunction();
      return 'Migration executada com sucesso.';
    } catch (error) {
      console.error('Erro ao executar a migration:', error);
      return 'Erro ao executar a migration.';
    }
  }

  @Get('user-table')
  async runMigrationUT(): Promise<string> {
    return this.runMigration(runMigrationUT);
  }

  @Get('genre-table')
  async runMigrationGT(): Promise<string> {
    return this.runMigration(runMigrationGT);
  }

  @Get('movie-table')
  async runMigrationMT(): Promise<string> {
    return this.runMigration(runMigrationMT);
  }

  @Get('movie-genre-table')
  async runMigrationMG(): Promise<string> {
    return this.runMigration(runMigrationMG);
  }

  @Get('rating-table')
  async runMigrationRT(): Promise<string> {
    return this.runMigration(runMigrationRT);
  }
}
