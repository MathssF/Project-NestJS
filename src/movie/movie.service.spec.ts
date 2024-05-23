import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { Genre } from './entities/genres.entity';

// Mock do repositório de gêneros
const genreRepositoryMock = {
  find: jest.fn().mockResolvedValue([
    { id: 1, name: 'Action' },
    { id: 2, name: 'Drama' },
  ]),
};

// Mock do serviço Redis
const redisServiceMock = {
  get: jest.fn(),
  set: jest.fn(),
};

describe('MovieService', () => {
  let service: MovieService;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [MovieService],
  //   }).compile();

  //   service = module.get<MovieService>(MovieService);
  // });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
  describe('MovieService', () => {
    let service: MovieService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          MovieService,
          { provide: 'GenreRepository', useValue: genreRepositoryMock },
          { provide: 'RedisService', useValue: redisServiceMock },
        ],
      }).compile();
  
      service = module.get<MovieService>(MovieService);
    });
  
    afterEach(() => {
      jest.clearAllMocks(); // Limpa os mocks após cada teste
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
  });
});
