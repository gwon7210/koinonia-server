import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateFaithConfessionDto {
  @IsNotEmpty()
  @IsString()
  faithConfession: string;
}
