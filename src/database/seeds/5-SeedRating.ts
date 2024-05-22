import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Movie } from 'src/movie/entities/movies.entity';
import { Rating } from 'src/user/entities/rating.entity';

export class RatingSeed implements MigrationInterface {
  // 
  public async up(queryRunner: QueryRunner): Promise<void> {
    const ratings = [
      { userId: 4, movieId: 823464, rating: 5 },
      { userId: 4, movieId: 653346, rating: 4 },
      { userId: 4, movieId: 940721, rating: 3 },
      { userId: 4, movieId: 1219685, rating: 5 },
      { userId: 4, movieId: 996154, rating: 4 },
      { userId: 4, movieId: 1093995, rating: 3 },
      { userId: 4, movieId: 693134, rating: 4 },
      { userId: 4, movieId: 1011985, rating: 5 },
      { userId: 4, movieId: 967847, rating: 3 },
      { userId: 4, movieId: 1094844, rating: 4 },
      { userId: 4, movieId: 1111873, rating: 5 },
      { userId: 4, movieId: 1096197, rating: 4 },
      { userId: 4, movieId: 843527, rating: 5 },
      { userId: 4, movieId: 748783, rating: 4 },
      { userId: 4, movieId: 920342, rating: 3 },
      { userId: 4, movieId: 119450, rating: 4 },
      { userId: 4, movieId: 1064178, rating: 5 },

      { userId: 5, movieId: 823464, rating: 2 },
      { userId: 5, movieId: 653346, rating: 1 },
      { userId: 5, movieId: 940721, rating: 3 },
      { userId: 5, movieId: 1219685, rating: 4 },
      { userId: 5, movieId: 996154, rating: 3 },
      { userId: 5, movieId: 1093995, rating: 5 },
      { userId: 5, movieId: 693134, rating: 4 },
      { userId: 5, movieId: 1011985, rating: 5 },
      { userId: 5, movieId: 967847, rating: 3 },
      { userId: 5, movieId: 1094844, rating: 4 },
      { userId: 5, movieId: 1111873, rating: 5 },
      { userId: 5, movieId: 1096197, rating: 4 },
      { userId: 5, movieId: 843527, rating: 5 },
      { userId: 5, movieId: 748783, rating: 4 },
      { userId: 5, movieId: 920342, rating: 3 },
      { userId: 5, movieId: 119450, rating: 4 },
      { userId: 5, movieId: 1064178, rating: 5 },

      { userId: 6, movieId: 823464, rating: 3 },
      { userId: 6, movieId: 653346, rating: 4 },
      { userId: 6, movieId: 940721, rating: 5 },
      { userId: 6, movieId: 1219685, rating: 4 },
      { userId: 6, movieId: 996154, rating: 3 },

      { userId: 7, movieId: 823464, rating: 4 },
      { userId: 7, movieId: 653346, rating: 5 },
      { userId: 7, movieId: 940721, rating: 4 },
      { userId: 7, movieId: 1219685, rating: 3 },
      { userId: 7, movieId: 996154, rating: 5 },

      { userId: 8, movieId: 748783, rating: 4 },
      { userId: 8, movieId: 920342, rating: 3 },
      { userId: 8, movieId: 843527, rating: 5 },
      { userId: 8, movieId: 1094844, rating: 4 },
      { userId: 8, movieId: 1111873, rating: 3 },

      { userId: 9, movieId: 748783, rating: 5 },
      { userId: 9, movieId: 920342, rating: 4 },
      { userId: 9, movieId: 843527, rating: 3 },
      { userId: 9, movieId: 1094844, rating: 5 },
      { userId: 9, movieId: 1111873, rating: 4 },

      { userId: 10, movieId: 693134, rating: 4 },
      { userId: 10, movieId: 1011985, rating: 5 },
      { userId: 10, movieId: 967847, rating: 3 },
      { userId: 10, movieId: 1096197, rating: 4 },
      { userId: 10, movieId: 1064178, rating: 5 },

      { userId: 11, movieId: 1093995, rating: 4 },
      { userId: 11, movieId: 1011985, rating: 3 },
      { userId: 11, movieId: 967847, rating: 5 },
      { userId: 11, movieId: 843527, rating: 4 },
      { userId: 11, movieId: 1094844, rating: 3 },

      { userId: 12, movieId: 920342, rating: 4 },
      { userId: 12, movieId: 119450, rating: 5 },
      { userId: 12, movieId: 1064178, rating: 3 },
      { userId: 12, movieId: 1111873, rating: 4 },
      { userId: 12, movieId: 1096197, rating: 5 },
  
      { userId: 13, movieId: 843527, rating: 3 },
      { userId: 13, movieId: 748783, rating: 4 },
      { userId: 13, movieId: 920342, rating: 5 },
      { userId: 13, movieId: 119450, rating: 4 },
      { userId: 13, movieId: 1064178, rating: 3 },
    ];

    const ratingRepository = getRepository(Rating);
    await ratingRepository.save(ratings.map(ratings => ratingRepository.create(ratings)));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM ratings');
  }
}