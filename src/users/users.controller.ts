import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, AccountStatus } from './dto/create-user.dto';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { User } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import type { UploadedFile as UploadedFileType } from './types/uploaded-file.type';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  createProfile(
    @CurrentUser() user: User,
    @Body() createUserProfileDto: CreateUserProfileDto,
  ) {
    return this.usersService.upsertProfile(user.id, createUserProfileDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  findProfile(@CurrentUser() user: User) {
    return this.usersService.findProfileByUserId(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/photo')
  findProfilePhoto(@CurrentUser() user: User) {
    return this.usersService.findProfilePhoto(user.id).then((profileImagePath) => ({
      profileImagePath,
    }));
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile/photo/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadProfilePhoto(
    @CurrentUser() user: User,
    @UploadedFile() file: UploadedFileType,
  ) {
    if (!file) {
      throw new BadRequestException('프로필 사진 파일이 필요합니다.');
    }

    return this.usersService.saveProfilePhoto(user.id, file);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('kakao/:kakaoId')
  findByKakaoId(@Param('kakaoId') kakaoId: string) {
    return this.usersService.findByKakaoId(kakaoId);
  }

  @Get('phone/:phoneNumber')
  findByPhoneNumber(@Param('phoneNumber') phoneNumber: string) {
    return this.usersService.findByPhoneNumber(phoneNumber);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: Partial<CreateUserDto>) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id/status')
  updateAccountStatus(
    @Param('id') id: string,
    @Body('status') status: AccountStatus,
  ) {
    return this.usersService.updateAccountStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
