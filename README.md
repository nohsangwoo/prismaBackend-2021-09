# prisma 2.0 BackEnd

## backEnd Setup

## apollo-server setting

-ref: https://www.npmjs.com/package/apollo-server

- npm install apollo-server graphql

## install nodemon and apply

- ref: https://www.npmjs.com/package/nodemon
- npm i nodemon --save-dev

## install babel

- 최신 자바스크립트 문법을 nodejs에서 사용할수있게 문법 호환성을 해결해준다.
- ref: https://babeljs.io/
- install ref: https://babeljs.io/setup (목록중 node를 찾아서 선택하면 설치 방법 나옴)

1. npm install --save-dev @babel/core
2. npm install @babel/preset-env --save-dev
3. In order to enable the preset you have to define it in your babel.config.json file, like this:

```
{
  "presets": ["@babel/preset-env"]
}
```

4. npm i @babel/node --save-dev
5. nodemon.json 작성
6. dev 실행 스크립트에 "nodemon --delay 2" 입력
   (delay는 컴파일시 나타나는 이슈를 해결하기위해 적용한다.)

- @babel/preset-env 로 적용시켜놓으면 어떤 프리셋을 적용해야할지 알아서 확인한 후 적합한 프리셋을 적용시켜준다.

## graphql usage

- 간단한 graphql 사용법 학습

## typeorm

## prisma setup

- npm install prisma typescript ts-node @types/node --save-dev
- npx prisma로 설치 잘됐는지 확인가능
- tsconfig.json 작성 및 outdir 폴더 생성(js로 컴파일된 파일 모아두는 곳)
- npx prisma init
  prisma - schema.prisma 파일과, .env 파일이 생성됨

## DB연결을 위해 database 선택해서 설치 - postgresql

- mac
  postgres app
  postico
- Window
  postgresql 서버 부터 다운받아야 하는 경우
  ref: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
  (db부터 pg-admin 까지 패키지로 다운가능)
- .env에 db연결 정보 입력

## prisma schema 작성에 도움을 주는 prisma extension 설치

- 설치 후 settings.json 설정 적용

## prisma schema 작성

- ref: https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/using-prisma-migrate-typescript-postgres/

## prisma migrate

- 스키마 작성 후 마이그레이트 작업을 해서 DB와 스키마모델을 동기화 해줘야함
  (schema.prisma파일을 기준으로 알아서 DB구성을 맞춰준다)
- ref: https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/using-prisma-migrate-typescript-postgres/

- 2021.09.16기준 마이그레이트 명령어(추후 변경될수 있음)
  npx prisma migrate dev --name init
  (dev명령어는 개발환경에서 마이그레이트를 진행할 것을 명시해줌)
  npx prisma migrate dev init (일단 name빼고 입력함)
  맨처음에만 init 넣어주고 다음번 migrate시에는
  npx prisma migrate dev 만 입력

## package.json에 migrate 실행 명령어 입력

## prisma로 DB제어하기

- ref: https://www.prisma.io/docs/concepts/components/prisma-client
- @prisma/client로 제어한다.

## prisma schema를 잘 설계했다면 typeDef과 schema를 일치 시켜야한다.

## CRUD

- create
  ref: https://www.prisma.io/docs/concepts/components/prisma-client/crud#create

- read
  ref: https://www.prisma.io/docs/concepts/components/prisma-client/crud#read

- update
  ref: https://www.prisma.io/docs/concepts/components/prisma-client/crud#update

## prisma studio

- DB 관리자 페이지
- npx prisma studio

## 프로젝트 구조 관리(dir) - divide and conquer

- graphql-tools를 이용한다.

## graphql-tools

- ref: https://www.graphql-tools.com/docs/schema-merging#print-merged-typedefs
  (필요한 모듈은 직접 설치해서 사용하면 됨)
  여러 merge 방법중 prin merged typeDefs 방법을 사용한다.

## merge schema

- 파일명을 규칙에 맞춰 설정해주면 된다.
  (작업해야함)
