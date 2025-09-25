import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSelfIntroductionDto {
  @IsNotEmpty()
  @IsString()
  selfIntroduction: string;
}
