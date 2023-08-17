import { Module } from '@nestjs/common';
import { KnightsService } from './knights.service';
import { KnightsController } from './knights.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Knight, KnightSchema } from './entities/knight.entity';
import { KnightsRepository } from './knights.repository';
import { HeroesRepository } from './heroes.repository';
import { Hero, HeroSchema } from './entities/hero.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Knight.name, schema: KnightSchema },
      { name: Hero.name, schema: HeroSchema },
    ]),
  ],
  controllers: [KnightsController],
  providers: [KnightsService, KnightsRepository, HeroesRepository],
})
export class KnightsModule {}
