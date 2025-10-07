import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateUserProfileDto {
  @IsOptional()
  @IsString()
  nickname?: string;

  @IsOptional()
  @IsString()
  selfIntroduction?: string;

  @IsOptional()
  @IsString()
  mbti?: string;

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

  @IsOptional()
  @IsInt()
  height?: number;
}
