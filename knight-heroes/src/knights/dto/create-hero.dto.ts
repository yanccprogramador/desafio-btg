import { Attributes, Weapon } from '../types';

export class CreateHeroDto {
  name: string;
  nickname: string;
  birthday: Date;
  keyAttribute: string;
  weapons: Weapon[];
  attributes: Attributes;
}
