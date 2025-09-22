import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, Gender, AccountStatus } from './dto/create-user.dto';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { User, UserProfile } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByKakaoId(kakaoId: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { kakaoId },
    });
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { phoneNumber },
    });
  }

  async update(id: string, updateData: Partial<CreateUserDto>): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async updateAccountStatus(id: string, status: AccountStatus): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { accountStatus: status },
    });
  }

  async upsertProfile(
    userId: string,
    createUserProfileDto: CreateUserProfileDto,
  ): Promise<UserProfile> {
    const profileData = createUserProfileDto;

    return this.prisma.userProfile.upsert({
      where: { userId },
      update: profileData,
      create: {
        userId,
        ...profileData,
      },
    });
  }

  async findProfileByUserId(userId: string): Promise<UserProfile | null> {
    return this.prisma.userProfile.findUnique({
      where: { userId },
    });
  }
}
