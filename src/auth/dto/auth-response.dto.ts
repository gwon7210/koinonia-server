import { Gender, AccountStatus } from '../../users/dto/create-user.dto';

export class AuthResponseDto {
  user: {
    id: string;
    gender?: Gender;
    kakaoId?: string;
    birthDate?: Date;
    phoneNumber?: string;
    accountStatus: AccountStatus;
    createdAt: Date;
    updatedAt: Date;
  };
  accessToken: string;
  refreshToken: string;
  isNewUser: boolean; // 회원이었는지 비회원이었는지 판단하는 플래그
}
