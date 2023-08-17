import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class Weapon {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  @Min(0)
  mod: number;
  @IsString()
  @IsNotEmpty()
  attr: string;
  @IsBoolean()
  equipped: boolean;
}

class Attributes {
  @IsNumber()
  @Min(0)
  strength: number;
  @IsNumber()
  @Min(0)
  dexterity: number;
  @IsNumber()
  @Min(0)
  constitution: number;
  @IsNumber()
  @Min(0)
  intelligence: number;
  @IsNumber()
  @Min(0)
  wisdom: number;
  @Min(0)
  @IsNumber()
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
