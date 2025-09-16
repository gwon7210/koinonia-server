import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { KakaoUserInfo } from './dto/kakao-login.dto';

@Injectable()
export class KakaoService {
  private readonly kakaoApiUrl = 'https://kapi.kakao.com/v2/user/me';

  constructor(private configService: ConfigService) {}

  async getUserInfo(accessToken: string): Promise<KakaoUserInfo> {
    try {
      const response = await axios.get(this.kakaoApiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      });

      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        throw new HttpException('유효하지 않은 카카오 액세스 토큰입니다.', HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException('카카오 사용자 정보를 가져오는데 실패했습니다.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  extractUserData(kakaoUserInfo: KakaoUserInfo) {
    const { id, kakao_account } = kakaoUserInfo;
    
    // 성별 변환 (카카오는 'male', 'female'을 사용)
    let gender: string | undefined;
    if (kakao_account.gender) {
      gender = kakao_account.gender === 'male' ? 'MALE' : 'FEMALE';
    }

    // 생년월일 변환 (카카오는 'MMDD' 형식)
    let birthDate: Date | undefined;
    if (kakao_account.birthday) {
      const birthday = kakao_account.birthday;
      const month = birthday.substring(0, 2);
      const day = birthday.substring(2, 4);
      // 현재 연도로 설정 (실제로는 사용자에게 연도 입력을 요청해야 함)
      const currentYear = new Date().getFullYear();
      birthDate = new Date(currentYear, parseInt(month) - 1, parseInt(day));
    }

    return {
      kakaoId: id.toString(),
      gender,
      birthDate,
      phoneNumber: kakao_account.phone_number?.replace(/[^0-9]/g, ''), // 숫자만 추출
    };
  }
}
