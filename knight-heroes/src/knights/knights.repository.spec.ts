import { Test, TestingModule } from '@nestjs/testing';
import { KnightsRepository } from './knights.repository';
import { Knight } from './entities/knight.entity';
import { getModelToken } from '@nestjs/mongoose';
import { CreateKnightDto } from './dto/create-knight.dto';
import { UpdateKnightDto } from './dto/update-knight.dto';

describe('KnightsRepository', () => {
  let repository: KnightsRepository;
  let mockKnightModel: any;
  const mockedModel = {
    find: () => {},
    findOne: () => {},
    create: () => {},
    updateOne: () => {},
    deleteOne: () => {},
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KnightsRepository,
        {
          provide: getModelToken(Knight.name),
          useValue: mockedModel,
        },
      ],
    }).compile();
    mockKnightModel = module.get(getModelToken(Knight.name));
    repository = module.get<KnightsRepository>(KnightsRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
  it('should return all knights', async () => {
    const knight = new Knight();
    const spy = jest.spyOn(mockKnightModel, 'find').mockImplementation(() => ({
      exec: () => {
        [knight];
      },
    }));
    await repository.findAll();
    expect(spy).toBeCalled();
  });

  it('should return a knight', async () => {
    const knight = new Knight();
    const spy = jest
      .spyOn(mockKnightModel, 'findOne')
      .mockImplementation(() => ({
        exec: () => {
          return knight;
        },
      }));
    await repository.findOne('objectID');
    expect(spy).toBeCalled();
  });

  it('should delete a knight', async () => {
    const spy = jest
      .spyOn(mockKnightModel, 'deleteOne')
      .mockImplementation(() => ({
        deletedCount: 1,
      }));
    await repository.remove('teste');
    expect(spy).toBeCalled();
  });

  it('should update a knight', async () => {
    const spy = jest
      .spyOn(mockKnightModel, 'updateOne')
      .mockImplementation(() => ({
        modifiedCount: 1,
      }));
    await repository.update('teste', new UpdateKnightDto());
    expect(spy).toBeCalled();
  });

  it('should create a knight', async () => {
    const dto = new CreateKnightDto();
    const spy = jest
      .spyOn(mockKnightModel, 'create')
      .mockImplementation(() => dto as any);
    await repository.create(dto);
    expect(spy).toBeCalled();
  });
});
