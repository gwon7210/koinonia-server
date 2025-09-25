import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMbitDto {
  @IsNotEmpty()
  @IsString()
  mbit: string;
}
