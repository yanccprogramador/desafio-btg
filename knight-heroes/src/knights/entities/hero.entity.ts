import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HeroDocument = HydratedDocument<Hero>;

class Weapon {
  name: string;
  mod: number;
  attr: string;
  equipped: boolean;
}

class Attributes {
  strength: number;
  dexterity: number;
  constitution: number;
  inteligence: number;
  wisdom: number;
  charisma: number;
}

@Schema()
export class Hero {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  nickname: string;

  @Prop({ required: true })
  birthday: Date;

  @Prop({ required: true })
  keyAttribute: string;

  @Prop({ required: true })
  weapons: Weapon[];

  @Prop({ required: true })
  attributes: Attributes;
}

export const HeroSchema = SchemaFactory.createForClass(Hero);
