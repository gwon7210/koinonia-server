import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMbtiDto {
  @IsNotEmpty()
  @IsString()
  mbti: string;
}
