<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Koinonia Server - NestJS와 Prisma를 사용한 소셜 미디어 서버

## 기술 스택

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: class-validator, class-transformer
- **Security**: Helmet, CORS, Throttler

## 프로젝트 설정

### 1. 사전 요구사항
- **Node.js** (v18 이상)
- **Docker & Docker Compose** (PostgreSQL 실행용)

#### Docker 설치 (macOS)
```bash
# Homebrew를 사용한 설치
$ brew install --cask docker

# 또는 공식 웹사이트에서 Docker Desktop 다운로드
# https://www.docker.com/products/docker-desktop
```

### 2. 의존성 설치
```bash
$ npm install
```

### 3. 환경변수 설정
`.env` 파일이 이미 생성되어 있습니다:

```env
# Database
DATABASE_URL="postgresql://postgres:strong_password123@localhost:5433/koinonia?schema=public"

# Application
NODE_ENV=development
PORT=3000

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000
```

### 4. 데이터베이스 설정 (Docker Compose)

```bash
# PostgreSQL 데이터베이스 시작
$ docker compose up -d

# 데이터베이스 연결 확인
$ docker compose logs postgres

# Prisma 클라이언트 생성
$ npm run prisma:generate

# 데이터베이스 스키마 동기화
$ npx prisma db push

# 시드 데이터 생성 (선택사항)
$ npm run db:seed
```

### 5. 서버 실행

```bash
# development 모드
$ npm run start:dev

# production 모드
$ npm run start:prod
```

서버가 시작되면 `http://localhost:3000/api`에서 접근할 수 있습니다.

### 6. 데이터베이스 관리

```bash
# Prisma Studio 실행 (데이터베이스 GUI)
$ npx prisma studio
# http://localhost:5555 에서 접근

# 데이터베이스 중지
$ docker compose down

# 데이터베이스 재시작 (데이터 유지)
$ docker compose restart

# 데이터베이스 완전 삭제 후 재시작
$ docker compose down -v
$ docker compose up -d
```

## 빠른 시작 가이드

```bash
# 1. 데이터베이스 시작
$ docker compose up -d

# 2. 데이터베이스 스키마 생성
$ npx prisma db push

# 3. 서버 시작
$ npm run start:dev

# 완료! 🎉
# API: http://localhost:3000/api
# Prisma Studio: npx prisma studio (http://localhost:5555)
```

## Prisma 관련 명령어

```bash
# Prisma 클라이언트 생성
$ npm run prisma:generate

# 개발 환경 마이그레이션
$ npm run prisma:migrate

# 프로덕션 마이그레이션 배포
$ npm run prisma:deploy

# 데이터베이스 리셋
$ npm run prisma:reset

# Prisma Studio 실행
$ npm run prisma:studio

# 데이터베이스 푸시 (스키마 동기화)
$ npm run db:push

# 시드 데이터 실행
$ npm run db:seed
```

## API 엔드포인트

### Users
- `GET /api/users` - 모든 사용자 조회
- `GET /api/users/:id` - 특정 사용자 조회
- `POST /api/users` - 사용자 생성
- `PUT /api/users/:id` - 사용자 정보 업데이트
- `DELETE /api/users/:id` - 사용자 삭제

## 데이터베이스 스키마

### User
- id, email, username, name, bio, avatar
- 관계: posts, likes, follows, followers

### Post
- id, content, imageUrl, authorId
- 관계: author, likes

### Like
- userId, postId (복합 키)

### Follow
- followerId, followingId (복합 키)

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
# koinonia-server
