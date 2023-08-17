import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateKnightDto } from './dto/create-knight.dto';
import { UpdateKnightDto } from './dto/update-knight.dto';
import { Knight } from './entities/knight.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class KnightsRepository {
  constructor(@InjectModel(Knight.name) private knightModel: Model<Knight>) {}

  create(createKnightDto: CreateKnightDto) {
    return this.knightModel.create(createKnightDto);
  }

  findAll() {
    return this.knightModel.find().exec();
  }

  async findOne(id: string): Promise<Knight> {
    const knight = await this.knightModel.findOne({ _id: id }).exec();
    if (!knight) {
      throw new NotFoundException();
    }
    return knight;
  }

  async update(id: string, updateKnightDto: UpdateKnightDto) {
    const result = await this.knightModel.updateOne(
      { _id: id },
      updateKnightDto,
    );
    if (result.modifiedCount == 0) {
      throw new NotFoundException();
    }
    return result;
  }

  async remove(id: string) {
    const result = await this.knightModel.deleteOne({ _id: id });
    if (result.deletedCount == 0) {
      throw new NotFoundException();
    }
    return result;
  }
}
