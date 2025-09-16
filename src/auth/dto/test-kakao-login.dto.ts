import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { Gender } from '../../users/dto/create-user.dto';

export class TestKakaoLoginDto {
  @IsString()
  @IsNotEmpty()
  kakaoId: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsString()
  birthDate?: string; // YYYY-MM-DD 형식

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  nickname?: string;
}
