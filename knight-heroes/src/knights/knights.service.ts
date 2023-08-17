import { Injectable } from '@nestjs/common';
import { CreateKnightDto } from './dto/create-knight.dto';
import { UpdateKnightDto } from './dto/update-knight.dto';
import { KnightsRepository } from './knights.repository';
import { HeroesRepository } from './heroes.repository';
import { Knight } from './entities/knight.entity';

@Injectable()
export class KnightsService {
  constructor(
    private readonly knightsRepository: KnightsRepository,
    private readonly heroesRepository: HeroesRepository,
  ) {}

  create(createKnightDto: CreateKnightDto) {
    return this.knightsRepository.create(createKnightDto);
  }

  async findAll(param: string) {
    const knights =
      param == 'heroes'
        ? await this.heroesRepository.findAll()
        : await this.knightsRepository.findAll();
    return knights.map((knight) => {
      const age = this.calculateAge(knight.birthday);
      return {
        id: knight.id,
        name: knight.name,
        age: age,
        weapons: knight.weapons.length,
        attack: this.calculateAttack(
          knight.weapons,
          knight.attributes[knight.keyAttribute],
        ),
        exp: this.calculateExp(age),
      };
    });
  }

  findOne(id: string): Promise<Knight> {
    return this.knightsRepository.findOne(id);
  }

  update(id: string, updateKnightDto: UpdateKnightDto) {
    return this.knightsRepository.update(id, updateKnightDto);
  }

  async remove(id: string) {
    const knight: Knight = await this.findOne(id);
    await this.heroesRepository.create({
      name: knight.name,
      nickname: knight.nickname,
      keyAttribute: knight.keyAttribute,
      attributes: knight.attributes,
      weapons: knight.weapons,
      birthday: knight.birthday,
    });
    return this.knightsRepository.remove(id);
  }

  private calculateAge(birthday: Date) {
    const month_diff = Date.now() - birthday.getTime();
    const age_dt = new Date(month_diff);
    const year = age_dt.getUTCFullYear();

    return Math.abs(year - 1970);
  }

  private calculateExp(age: number) {
    if (age < 7) {
      return 0;
    }
    return Math.floor((age - 7) * Math.pow(22, 1.45));
  }

  private calculateAttack(weapons, attribute) {
    return (
      10 + this.mod(attribute) + weapons.find((weapon) => weapon.equipped).mod
    );
  }

  private mod(attribute) {
    if (attribute >= 0 && attribute <= 8) {
      return -2;
    }
    if (attribute >= 9 && attribute <= 10) {
      return -1;
    }
    if (attribute >= 11 && attribute <= 12) {
      return 0;
    }
    if (attribute >= 13 && attribute <= 15) {
      return 1;
    }
    if (attribute >= 16 && attribute <= 18) {
      return 2;
    }
    if (attribute >= 19 && attribute <= 20) {
      return 3;
    }
  }
}
