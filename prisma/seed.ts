import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 시드 데이터 생성 중...');

  // 기존 데이터 삭제 (개발 환경에서만)
  await prisma.like.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.post.deleteMany();
  await prisma.userProfile.deleteMany();
  await prisma.user.deleteMany();

  const userSeedData: Prisma.UserCreateInput[] = [
    {
      gender: 'MALE',
      kakaoId: 'kakao_1001',
      birthDate: new Date('1992-03-12'),
      phoneNumber: '01011112222',
      accountStatus: 'ACTIVE',
      profile: {
        create: {
          nickname: 'gracefullion',
          selfIntroduction: '믿음과 운동을 사랑하는 형제입니다.',
          mbti: 'INTJ',
          idealType: '신앙과 삶을 함께 나눌 수 있는 동역자',
          profileImagePath: '/uploads/profiles/user1.jpg',
          faithConfession: '예수님은 저의 모든 것입니다.',
          hobbies: ['등산', '기타 연주', '성경 묵상'],
          height: 180,
        },
      },
    },
    {
      gender: 'FEMALE',
      kakaoId: 'kakao_1002',
      birthDate: new Date('1994-07-08'),
      phoneNumber: '01022223333',
      accountStatus: 'ACTIVE',
      profile: {
        create: {
          nickname: 'joyfulolive',
          selfIntroduction: '사람을 사랑하고 모임을 즐기는 자매예요.',
          mbti: 'ENFP',
          idealType: '따뜻한 마음과 유머 감각',
          profileImagePath: '/uploads/profiles/user2.jpg',
          faithConfession: '항상 기뻐하고 쉬지 말고 기도하겠습니다.',
          hobbies: ['카페 투어', '보드게임', '찬양'],
          height: 165,
        },
      },
    },
    {
      gender: 'MALE',
      kakaoId: 'kakao_1003',
      birthDate: new Date('1988-11-25'),
      phoneNumber: '01033334444',
      accountStatus: 'ACTIVE',
      profile: {
        create: {
          nickname: 'steadfastoak',
          selfIntroduction: '말씀 묵상과 봉사를 즐기는 직장인입니다.',
          mbti: 'ISTJ',
          idealType: '믿음의 우선순위가 뚜렷한 사람',
          profileImagePath: '/uploads/profiles/user3.jpg',
          faithConfession: '주님만 의지하는 삶을 살고 싶습니다.',
          hobbies: ['요리', '달리기', '독서'],
          height: 178,
        },
      },
    },
    {
      gender: 'FEMALE',
      kakaoId: 'kakao_1004',
      birthDate: new Date('1996-09-17'),
      phoneNumber: '01044445555',
      accountStatus: 'ACTIVE',
      profile: {
        create: {
          nickname: 'morningdawn',
          selfIntroduction: '새벽 기도와 사진 찍기를 좋아해요.',
          mbti: 'INFJ',
          idealType: '섬김의 마음이 있는 사람',
          profileImagePath: '/uploads/profiles/user4.jpg',
          faithConfession: '기도로 하루를 시작합니다.',
          hobbies: ['사진 촬영', '드라이브', '요가'],
          height: 162,
        },
      },
    },
    {
      gender: 'MALE',
      kakaoId: 'kakao_1005',
      birthDate: new Date('1993-02-03'),
      phoneNumber: '01055556666',
      accountStatus: 'ACTIVE',
      profile: {
        create: {
          nickname: 'lightrunner',
          selfIntroduction: '스포츠와 찬양팀 활동을 병행하는 청년입니다.',
          mbti: 'ENTP',
          idealType: '활기차고 서로 격려해 주는 관계',
          profileImagePath: '/uploads/profiles/user5.jpg',
          faithConfession: '찬양으로 주님께 영광 돌립니다.',
          hobbies: ['농구', '작곡', '여행'],
          height: 183,
        },
      },
    },
  ];

  const createdUsers = await Promise.all(
    userSeedData.map((data) => prisma.user.create({ data }))
  );

  if (createdUsers.length >= 2) {
    await prisma.post.createMany({
      data: [
        {
          content: '안녕하세요! 첫 번째 포스트입니다. 🎉',
          authorId: createdUsers[0].id,
        },
        {
          content: 'NestJS와 Prisma로 개발하는 것이 정말 즐겁네요!',
          authorId: createdUsers[1].id,
        },
      ],
    });
  }

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
