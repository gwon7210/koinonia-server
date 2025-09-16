import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { KakaoLoginDto } from './dto/kakao-login.dto';
import { TestKakaoLoginDto } from './dto/test-kakao-login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('kakao')
  async kakaoLogin(@Body() kakaoLoginDto: KakaoLoginDto): Promise<AuthResponseDto> {
    return this.authService.kakaoLogin(kakaoLoginDto);
  }

  @Public()
  @Post('kakao/test')
  async testKakaoLogin(@Body() testKakaoLoginDto: TestKakaoLoginDto): Promise<AuthResponseDto> {
    return this.authService.testKakaoLogin(testKakaoLoginDto);
  }

  @Public()
  @Post('refresh')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@CurrentUser() user: any) {
    return {
      user: {
        id: user.id,
        gender: user.gender,
        kakaoId: user.kakaoId,
        birthDate: user.birthDate,
        phoneNumber: user.phoneNumber,
        accountStatus: user.accountStatus,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }
}
