import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { Genre } from './entities/genres.entity';
import { NotFoundException } from '@nestjs/common';

// Mock do repositório de filmes
const movieRepositoryMock = {
  find: jest.fn().mockResolvedValue([{ id: 1, name: 'Movie 1' }, { id: 2, name: 'Movie 2' }]),
  findOne: jest.fn().mockResolvedValue({ id: 1, name: 'Movie 1' }),
  findByIds: jest.fn().mockResolvedValue([{ id: 1, name: 'Movie 1' }, { id: 2, name: 'Movie 2' }]),
};

// Mock do repositório de gêneros
const genreRepositoryMock = {
  find: jest.fn().mockResolvedValue([
    { id: 1, name: 'Action' },
    { id: 2, name: 'Drama' },
  ]),
  findOne: jest.fn(),
};

// Mock do repositório de avaliações
const ratingRepositoryMock = {
  find: jest.fn().mockResolvedValue([{ rating: 5 }, { rating: 4 }]),
};

// Mock do serviço Redis
const redisServiceMock = {
  get: jest.fn(),
  set: jest.fn(),
};

describe('MovieService', () => {
  let service: MovieService;
  describe('MovieService', () => {
    let service: MovieService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          MovieService,
          { provide: 'MovieRepository', useValue: movieRepositoryMock },
          { provide: 'GenreRepository', useValue: genreRepositoryMock },
          { provide: 'RatingRepository', useValue: ratingRepositoryMock },
          { provide: 'RedisService', useValue: redisServiceMock },
        ],
      }).compile();
  
      service = module.get<MovieService>(MovieService);
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('findGenres', () => {
      it('should return genres from Redis cache if available', async () => {
        const cachedGenres = [{ id: 1, name: 'Action' }, { id: 2, name: 'Drama' }];
        redisServiceMock.get.mockResolvedValueOnce(JSON.stringify(cachedGenres));
  
        const result = await service.findGenres();
  
        expect(result).toEqual(cachedGenres);
        expect(redisServiceMock.get).toBeCalledWith('genres');
        expect(genreRepositoryMock.find).not.toBeCalled(); // Certifica-se de que o repositório não foi chamado
      });
  
      it('should return genres from repository and set Redis cache if not available', async () => {
        const genresFromRepository = [{ id: 1, name: 'Action' }, { id: 2, name: 'Drama' }];
        genreRepositoryMock.find.mockResolvedValueOnce(genresFromRepository);
  
        const result = await service.findGenres();
  
        expect(result).toEqual(genresFromRepository);
        expect(redisServiceMock.set).toBeCalledWith('genres', JSON.stringify(genresFromRepository), 3600);
      });
    });
  
    describe('findGenresName', () => {
      it('should return genre names from Redis cache if available', async () => {
        const cachedGenreNames = ['Action', 'Drama'];
        redisServiceMock.get.mockResolvedValueOnce(JSON.stringify(cachedGenreNames));
  
        const result = await service.findGenresName();
  
        expect(result).toEqual(cachedGenreNames);
        expect(redisServiceMock.get).toBeCalledWith('genreNames');
        expect(genreRepositoryMock.find).not.toBeCalled(); // Certifica-se de que o repositório não foi chamado
      });
  
      it('should return genre names from repository and set Redis cache if not available', async () => {
        const genresFromRepository = [{ id: 1, name: 'Action' }, { id: 2, name: 'Drama' }];
        const genreNamesFromRepository = ['Action', 'Drama'];
        genreRepositoryMock.find.mockResolvedValueOnce(genresFromRepository);
  
        const result = await service.findGenresName();
  
        expect(result).toEqual(genreNamesFromRepository);
        expect(redisServiceMock.set).toBeCalledWith('genreNames', JSON.stringify(genreNamesFromRepository), 3600);
      });
    });

    describe('findAllMovies', () => {
      it('should return movies from Redis cache if available', async () => {
        const cachedMovies = [{ id: 1, name: 'Movie 1' }, { id: 2, name: 'Movie 2' }];
        redisServiceMock.get.mockResolvedValueOnce(JSON.stringify(cachedMovies));
  
        const result = await service.findAllMovies();
  
        expect(result).toEqual(cachedMovies);
        expect(redisServiceMock.get).toBeCalledWith('allMovies');
        expect(movieRepositoryMock.find).not.toBeCalled(); // Certifica-se de que o repositório não foi chamado
      });
  
      it('should return movies from repository and set Redis cache if not available', async () => {
        const moviesFromRepository = [{ id: 1, name: 'Movie 1' }, { id: 2, name: 'Movie 2' }];
        movieRepositoryMock.find.mockResolvedValueOnce(moviesFromRepository);
  
        const result = await service.findAllMovies();
  
        expect(result).toEqual(moviesFromRepository);
        expect(redisServiceMock.set).toBeCalledWith('allMovies', JSON.stringify(moviesFromRepository), 3600);
      });
    });
  
    describe('findMovieById', () => {
      it('should return movie from Redis cache if available', async () => {
        const cachedMovie = { id: 1, name: 'Movie 1' };
        redisServiceMock.get.mockResolvedValueOnce(JSON.stringify(cachedMovie));
  
        const result = await service.findMovieById(1);
  
        expect(result).toEqual(cachedMovie);
        expect(redisServiceMock.get).toBeCalledWith('theMovie:1');
        expect(movieRepositoryMock.findOne).not.toBeCalled(); // Certifica-se de que o repositório não foi chamado
        expect(ratingRepositoryMock.find).not.toBeCalled(); // Certifica-se de que o repositório de avaliações não foi chamado
      });
  
      it('should return movie with average rating from repository and set Redis cache if not available', async () => {
        const movieFromRepository = { id: 1, name: 'Movie 1' };
        movieRepositoryMock.findOne.mockResolvedValueOnce(movieFromRepository);
  
        const result = await service.findMovieById(1);
  
        expect(result).toHaveProperty('rating', '4.5');
        expect(redisServiceMock.set).toBeCalledWith('theMovie:1', JSON.stringify({ ...movieFromRepository, rating: '4.5' }), 3600);
      });
  
      it('should throw NotFoundException if movie is not found', async () => {
        movieRepositoryMock.findOne.mockResolvedValueOnce(undefined);
  
        await expect(service.findMovieById(1)).rejects.toThrowError(NotFoundException);
      });
    });
  });
  describe('findMoviesByGenreId', () => {
    it('should return movies from Redis cache if available', async () => {
      const cachedMovies = [{ id: 1, name: 'Movie 1' }, { id: 2, name: 'Movie 2' }];
      redisServiceMock.get.mockResolvedValueOnce(JSON.stringify(cachedMovies));

      const result = await service.findMoviesByGenreId(1);

      expect(result).toEqual(cachedMovies);
      expect(redisServiceMock.get).toBeCalledWith('theGenre:1');
      expect(movieRepositoryMock.findByIds).not.toBeCalled(); // Certifica-se de que o repositório não foi chamado
    });

    it('should return movies from repository and set Redis cache if not available', async () => {
      const moviesFromRepository = [{ id: 1, name: 'Movie 1' }, { id: 2, name: 'Movie 2' }];
      movieRepositoryMock.findByIds.mockResolvedValueOnce(moviesFromRepository);

      const result = await service.findMoviesByGenreId(1);

      expect(result).toEqual(moviesFromRepository);
      expect(redisServiceMock.set).toBeCalledWith('theGenre:1', JSON.stringify(moviesFromRepository), 3600);
    });

    it('should return empty array if no movies found for genre', async () => {
      movieRepositoryMock.findByIds.mockResolvedValueOnce([]);

      const result = await service.findMoviesByGenreId(1);

      expect(result).toEqual([]);
    });
  });

  describe('findMoviesByGenreName', () => {
    it('should return movies by genre name', async () => {
      const moviesFromGenre = [{ id: 1, name: 'Movie 1' }, { id: 2, name: 'Movie 2' }];
      const genreId = 1;
      genreRepositoryMock.findOne.mockResolvedValueOnce({ id: genreId });

      const result = await service.findMoviesByGenreName('Action');

      expect(result).toEqual(moviesFromGenre);
      expect(genreRepositoryMock.findOne).toBeCalledWith({ where: { name: 'Action' } });
      expect(service.findMoviesByGenreId).toBeCalledWith(genreId);
    });

    it('should return empty array if genre not found', async () => {
      genreRepositoryMock.findOne.mockResolvedValueOnce(undefined);

      const result = await service.findMoviesByGenreName('Comedy');

      expect(result).toEqual([]);
      expect(genreRepositoryMock.findOne).toBeCalledWith({ where: { name: 'Comedy' } });
      expect(service.findMoviesByGenreId).not.toBeCalled(); // Certifica-se de que a função para encontrar filmes por ID de gênero não foi chamada
    });
  });
});
