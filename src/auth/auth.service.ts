import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { KakaoService } from './kakao.service';
import { JwtAuthService } from './jwt.service';
import { KakaoLoginDto } from './dto/kakao-login.dto';
import { TestKakaoLoginDto } from './dto/test-kakao-login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { Gender, AccountStatus } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private kakaoService: KakaoService,
    private jwtAuthService: JwtAuthService,
  ) {}

  async kakaoLogin(kakaoLoginDto: KakaoLoginDto): Promise<AuthResponseDto> {
    try {
      // 1. 카카오에서 사용자 정보 가져오기
      const kakaoUserInfo = await this.kakaoService.getUserInfo(kakaoLoginDto.accessToken);
      console.log("1");

      // 2. 카카오 사용자 정보에서 필요한 데이터 추출
      const userData = this.kakaoService.extractUserData(kakaoUserInfo);
      console.log("11");
      console.log("userData:", userData);
      
      // 3. 기존 사용자 확인
      console.log("findByKakaoId 호출 전, kakaoId:", userData.kakaoId);
      let user;
      try {
        user = await this.usersService.findByKakaoId(userData.kakaoId);
        console.log("findByKakaoId 호출 후, user:", user);
      } catch (error) {
        console.error("findByKakaoId 호출 중 예외 발생:", error);
        console.error("예외 스택:", error.stack);
        throw error; // 예외를 다시 던져서 상위에서 처리하도록 함
      }
      let isNewUser = false;
      console.log("111");

      if (!user) {
        // 4. 새 사용자 생성
        user = await this.usersService.create({
          kakaoId: userData.kakaoId,
          gender: userData.gender as Gender,
          birthDate: userData.birthDate?.toISOString(),
          phoneNumber: userData.phoneNumber,
          accountStatus: AccountStatus.ACTIVE,
        });
        isNewUser = true;
      } 
      
      console.log("11111");

      // 6. JWT 토큰 생성
      const tokens = this.jwtAuthService.generateTokens(user.id);

      // 7. 응답 데이터 구성
      return {
        user: {
          id: user.id,
          gender: user.gender as Gender,
          kakaoId: user.kakaoId || undefined,
          birthDate: user.birthDate || undefined,
          phoneNumber: user.phoneNumber || undefined,
          accountStatus: user.accountStatus as AccountStatus,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        isNewUser,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('로그인 중 오류가 발생했습니다.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async testKakaoLogin(testKakaoLoginDto: TestKakaoLoginDto): Promise<AuthResponseDto> {
    try {
      console.log('테스트 카카오 로그인 시작:', testKakaoLoginDto);
      
      // 1. 프론트에서 보내준 데이터를 그대로 사용
      const userData = {
        kakaoId: testKakaoLoginDto.kakaoId,
        gender: testKakaoLoginDto.gender,
        birthDate: testKakaoLoginDto.birthDate ? new Date(testKakaoLoginDto.birthDate) : undefined,
        phoneNumber: testKakaoLoginDto.phoneNumber,
      };
      
      // 2. 기존 사용자 확인
      let user;
      try {
        user = await this.usersService.findByKakaoId(userData.kakaoId);
        console.log('기존 사용자 찾음:', user);
      } catch (error) {
        console.log('기존 사용자 없음, 새로 생성 예정');
        user = null;
      }
      
      let isNewUser = false;

      if (!user) {
        // 3. 새 사용자 생성
        user = await this.usersService.create({
          kakaoId: userData.kakaoId,
          gender: userData.gender || Gender.MALE, // 기본값 설정
          birthDate: userData.birthDate?.toISOString(),
          phoneNumber: userData.phoneNumber,
          accountStatus: AccountStatus.ACTIVE,
        });
        isNewUser = true;
        console.log('새 사용자 생성:', user);
      } 

      // 4. JWT 토큰 생성
      const tokens = this.jwtAuthService.generateTokens(user.id);

      // 5. 응답 데이터 구성
      return {
        user: {
          id: user.id,
          gender: user.gender as Gender,
          kakaoId: user.kakaoId || undefined,
          birthDate: user.birthDate || undefined,
          phoneNumber: user.phoneNumber || undefined,
          accountStatus: user.accountStatus as AccountStatus,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        isNewUser,
      };
    } catch (error) {
      console.error('테스트 카카오 로그인 에러:', error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('테스트 로그인 중 오류가 발생했습니다.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const payload = this.jwtAuthService.verifyRefreshToken(refreshToken);
      const user = await this.usersService.findOne(payload.sub);
      
      if (!user) {
        throw new HttpException('사용자를 찾을 수 없습니다.', HttpStatus.UNAUTHORIZED);
      }

      const tokens = this.jwtAuthService.generateTokens(user.id);
      return { accessToken: tokens.accessToken };
    } catch (error) {
      throw new HttpException('유효하지 않은 리프레시 토큰입니다.', HttpStatus.UNAUTHORIZED);
    }
  }
}
