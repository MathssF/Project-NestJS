import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { SeedService } from 'src/seed/seed.service';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seedService = app.get(SeedService);

  try {
    // console.log('Iniciando as seeds')
    // await seedService.SeedUser();
    // console.log('Seed User completed succesfully!')
    // await seedService.SeedGenre();
    // console.log('Seed Genre completed succesfully!')
    // await seedService.SeedMovie();
    // console.log('Seed Movie completed succesfully!')
    // await seedService.SeedRelations();
    // console.log('Seed Relations completed succesfully!')
    // await seedService.SeedRating();
    // console.log('Seed Votes completed successfully!');
    await seedService.seed();
  } catch (error) {
    console.error('Error occurred while seeding:', error);
  }

  await app.close();
}