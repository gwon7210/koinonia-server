import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateIdealTypeDto {
  @IsNotEmpty()
  @IsString()
  idealType: string;
}
