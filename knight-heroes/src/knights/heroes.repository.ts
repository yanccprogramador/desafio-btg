import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hero } from './entities/hero.entity';
import { CreateHeroDto } from './dto/create-hero.dto';

@Injectable()
export class HeroesRepository {
  constructor(
    @InjectModel(Hero.name)
    private heroesModel: Model<Hero>,
  ) {}

  create(createHeroDto: CreateHeroDto) {
    return this.heroesModel.create(createHeroDto);
  }

  findAll() {
    return this.heroesModel.find().exec();
  }
}
