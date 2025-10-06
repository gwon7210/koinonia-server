import { IsArray, IsOptional, IsString } from 'class-validator';

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

  @IsOptional()
  @IsString()
  profileImagePath?: string;

  @IsOptional()
  @IsString()
  faithConfession?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  hobbies?: string[];
}
