import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type KnightDocument = HydratedDocument<Knight>;

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
  intelligence: number;
  wisdom: number;
  charisma: number;
}

@Schema()
export class Knight {
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

export const KnightSchema = SchemaFactory.createForClass(Knight);
