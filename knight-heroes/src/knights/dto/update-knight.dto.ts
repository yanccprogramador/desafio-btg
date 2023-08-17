import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class UpdateKnightDto {
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => Object.keys(o).length == 1)
  nickname: string;
}
