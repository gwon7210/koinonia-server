import { IsOptional, IsString } from 'class-validator';

export class CreateUserProfileDto {
  @IsOptional()
  @IsString()
  selfIntroduction?: string;

  @IsOptional()
  @IsString()
  mbit?: string;

  @IsOptional()
  @IsString()
  idealType?: string;
}
