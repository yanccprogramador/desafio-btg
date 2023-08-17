import { Test, TestingModule } from '@nestjs/testing';
import { KnightsService } from './knights.service';
import { KnightsRepository } from './knights.repository';
import { HeroesRepository } from './heroes.repository';
import { Knight } from './entities/knight.entity';
import { UpdateKnightDto } from './dto/update-knight.dto';
import { CreateKnightDto } from './dto/create-knight.dto';
import { CreateHeroDto } from './dto/create-hero.dto';
import { Hero } from './entities/hero.entity';
import { getModelToken } from '@nestjs/mongoose';

describe('KnightsService', () => {
  let service: KnightsService;
  let repository: KnightsRepository;
  let heroRepository: HeroesRepository;
  const mockedModel = {
    find: () => {},
    findOne: () => {},
    create: () => {},
    updateOne: () => {},
    deleteOne: () => {},
  };
  let mock = {
    name: 'test',
    nickname: 'testnick',
    birthday: new Date('2000-10-11T00:00:00.000Z'),
    keyAttribute: 'strength',
    weapons: [
      {
        name: 'sword',
        mod: 3,
        attr: ' strength',
        equipped: true,
      },
    ],
    attributes: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KnightsRepository,
        KnightsService,
        HeroesRepository,
        {
          provide: getModelToken(Knight.name),
          useValue: mockedModel,
        },
        {
          provide: getModelToken(Hero.name),
          useValue: mockedModel,
        },
      ],
    }).compile();
    service = module.get(KnightsService);
    repository = module.get<KnightsRepository>(KnightsRepository);
    heroRepository = module.get<HeroesRepository>(HeroesRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
  it('should return all knights', async () => {
    const knight = new Knight();
    const spy = jest
      .spyOn(repository, 'findAll')
      .mockImplementation((): any => [mock]);
    await service.findAll('');
    expect(spy).toBeCalled();
  });
  it('should return all heroes', async () => {
    const spy = jest
      .spyOn(heroRepository, 'findAll')
      .mockImplementation((): any => [mock]);
    await service.findAll('heroes');
    expect(spy).toBeCalled();
  });

  it('should return a knight', async () => {
    const knight = new Knight();
    const spy = jest
      .spyOn(repository, 'findOne')
      .mockImplementation((): any => knight);
    await service.findOne('objectID');
    expect(spy).toBeCalled();
  });

  it('should delete a knight', async () => {
    jest
      .spyOn(service, 'findOne')
      .mockImplementation(() => new CreateHeroDto() as any);
    jest
      .spyOn(heroRepository, 'create')
      .mockImplementation(() => new CreateHeroDto() as any);
    const spy = jest
      .spyOn(repository, 'remove')
      .mockImplementation((): any => ({
        deletedCount: 1,
      }));
    await service.remove('teste');
    expect(spy).toBeCalled();
  });

  it('should update a knight', async () => {
    const spy = jest
      .spyOn(repository, 'update')
      .mockImplementation((): any => ({
        modifiedCount: 1,
      }));

    await service.update('teste', new UpdateKnightDto());
    expect(spy).toBeCalled();
  });

  it('should create a knight', async () => {
    const dto = new CreateKnightDto();
    const spy = jest
      .spyOn(repository, 'create')
      .mockImplementation(() => dto as any);
    await service.create(dto);
    expect(spy).toBeCalled();
  });
});
