import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class Weapon {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumberString()
  @IsNotEmpty()
  mod: number;
  @IsString()
  @IsNotEmpty()
  attr: string;
  @IsBoolean()
  equipped: boolean;
}

class Attributes {
  @IsNumberString()
  @IsNotEmpty()
  strength: number;
  @IsNumberString()
  @IsNotEmpty()
  dexterity: number;
  @IsNumber()
  @IsNotEmpty()
  constitution: number;
  @IsNumberString()
  @IsNotEmpty()
  intelligence: number;
  @IsNumberString()
  @IsNotEmpty()
  wisdom: number;
  @IsNotEmpty()
  @IsNumberString()
  charisma: number;
}

export class CreateKnightDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  nickname: string;
  @IsDateString()
  @IsNotEmpty()
  birthday: Date;
  @IsString()
  @IsNotEmpty()
  keyAttribute: string;
  @ValidateNested({ each: true })
  @Type(() => Weapon)
  weapons: Weapon[];
  @ValidateNested()
  @Type(() => Attributes)
  attributes: Attributes;
}
