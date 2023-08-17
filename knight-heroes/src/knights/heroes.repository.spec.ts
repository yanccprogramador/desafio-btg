import { Test, TestingModule } from '@nestjs/testing';
import { HeroesRepository } from './heroes.repository';
import { Hero } from './entities/hero.entity';
import { getModelToken } from '@nestjs/mongoose';
import { CreateHeroDto } from './dto/create-hero.dto';

describe('HeroesRepository', () => {
  let repository: HeroesRepository;
  let mockHeroModel: any;
  const mockedModel = {
    exec: () => {
      return {};
    },
    find: () => {
      return {
        exec: () => {},
      };
    },
    create: () => {},
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HeroesRepository,
        {
          provide: getModelToken(Hero.name),
          useValue: mockedModel,
        },
      ],
    }).compile();

    mockHeroModel = module.get(getModelToken(Hero.name));
    repository = module.get<HeroesRepository>(HeroesRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
  it('should return all heroes', async () => {
    const hero = new Hero();
    const spy = jest.spyOn(mockHeroModel, 'find').mockImplementation(() => ({
      exec: () => {
        [hero];
      },
    }));
    await repository.findAll();
    expect(spy).toBeCalled();
  });

  it('should create a heroes', async () => {
    const dto = new CreateHeroDto();
    const spy = jest
      .spyOn(mockHeroModel, 'create')
      .mockImplementation(() => dto as any);
    await repository.create(dto);
    expect(spy).toBeCalled();
  });
});
