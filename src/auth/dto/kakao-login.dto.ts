import { IsString, IsNotEmpty } from 'class-validator';

export class KakaoLoginDto {
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}

export class KakaoUserInfo {
  id: number;
  connected_at: string;
  properties: {
    nickname: string;
    profile_image?: string;
    thumbnail_image?: string;
  };
  kakao_account: {
    profile_nickname_needs_agreement: boolean;
    profile_image_needs_agreement: boolean;
    profile: {
      nickname: string;
      thumbnail_image_url?: string;
      profile_image_url?: string;
      is_default_image: boolean;
    };
    has_email: boolean;
    email_needs_agreement: boolean;
    is_email_valid: boolean;
    is_email_verified: boolean;
    email?: string;
    has_phone_number: boolean;
    phone_number_needs_agreement: boolean;
    phone_number?: string;
    has_birthday: boolean;
    birthday_needs_agreement: boolean;
    birthday?: string;
    has_gender: boolean;
    gender_needs_agreement: boolean;
    gender?: string;
  };
}
