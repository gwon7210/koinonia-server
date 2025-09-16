import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 시드 데이터 생성 중...');

  // 기존 데이터 삭제 (개발 환경에서만)
  await prisma.like.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // 사용자 생성 (새로운 User 모델에 맞게)
  const user1 = await prisma.user.create({
    data: {
      gender: 'MALE',
      kakaoId: '123456789',
      birthDate: new Date('1990-01-15'),
      phoneNumber: '01012345678',
      accountStatus: 'ACTIVE',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      gender: 'FEMALE',
      kakaoId: '987654321',
      birthDate: new Date('1995-05-20'),
      phoneNumber: '01087654321',
      accountStatus: 'ACTIVE',
    },
  });

  // 포스트 생성
  await prisma.post.create({
    data: {
      content: '안녕하세요! 첫 번째 포스트입니다. 🎉',
      authorId: user1.id,
    },
  });

  await prisma.post.create({
    data: {
      content: 'NestJS와 Prisma로 개발하는 것이 정말 즐겁네요!',
      authorId: user2.id,
    },
  });

  console.log('✅ 시드 데이터 생성 완료!');
}

main()
  .catch((e) => {
    console.error('❌ 시드 데이터 생성 실패:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });