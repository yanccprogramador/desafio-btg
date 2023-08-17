import { Test, TestingModule } from '@nestjs/testing';
import { KnightsController } from './knights.controller';
import { KnightsService } from './knights.service';
import { Knight } from './entities/knight.entity';
import { Hero } from './entities/hero.entity';
import { UpdateKnightDto } from './dto/update-knight.dto';
import { CreateKnightDto } from './dto/create-knight.dto';
import { KnightsRepository } from './knights.repository';
import { HeroesRepository } from './heroes.repository';
import { getModelToken } from '@nestjs/mongoose';

describe('KnightsController', () => {
  let controller: KnightsController;
  let service: KnightsService;
  const mockedModel = {
    find: () => {},
    findOne: () => {},
    create: () => {},
    updateOne: () => {},
    deleteOne: () => {},
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KnightsController],
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

    controller = module.get<KnightsController>(KnightsController);
    service = module.get<KnightsService>(KnightsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should return all knights', async () => {
    const knight = new Knight();
    const spy = jest
      .spyOn(service, 'findAll')
      .mockImplementation((): any => [knight]);
    await controller.findAll('knights');
    expect(spy).toBeCalled();
  });
  it('should return all heroes', async () => {
    const spy = jest
      .spyOn(service, 'findAll')
      .mockImplementation((): any => [new Hero()]);
    await controller.findAll('heroes');
    expect(spy).toBeCalled();
  });

  it('should return a knight', async () => {
    const knight = new Knight();
    const spy = jest
      .spyOn(service, 'findOne')
      .mockImplementation((): any => knight);
    await controller.findOne('objectID');
    expect(spy).toBeCalled();
  });

  it('should delete a knight', async () => {
    const spy = jest.spyOn(service, 'remove').mockImplementation((): any => ({
      deletedCount: 1,
    }));
    await controller.remove('teste');
    expect(spy).toBeCalled();
  });

  it('should update a knight', async () => {
    const spy = jest.spyOn(service, 'update').mockImplementation((): any => ({
      modifiedCount: 1,
    }));

    await controller.update('teste', new UpdateKnightDto());
    expect(spy).toBeCalled();
  });

  it('should create a knight', async () => {
    const dto = new CreateKnightDto();
    const spy = jest
      .spyOn(service, 'create')
      .mockImplementation(() => dto as any);
    await controller.create(dto);
    expect(spy).toBeCalled();
  });
});
