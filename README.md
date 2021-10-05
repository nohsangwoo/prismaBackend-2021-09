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

## install prisma

- npm install prisma typescript ts-node @types/node --save-dev
- npx prisma로 설치 잘됐는지 확인가능
- tsconfig.json 작성 및 outdir 폴더 생성(js로 컴파일된 파일 모아두는 곳)

## prisma init

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

## makeExecutableSchema로 schema관련 내용 묶어주기

divide and conquer

## dotenv

- npm install dotenv
- and inport server of the top with this command

```
require("dotenv").config();
```

## reset for new Start!

remove directory that prisma and src/movie

## prisma init and migrate again

## prisma CRUD

- ref: https://www.prisma.io/docs/concepts/components/prisma-client/crud

- ref: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference

## create Account

## bcrypt를 이용하여 암호 해시화 하기

- ref: https://www.npmjs.com/package/bcrypt
- bcrypt가 password hashing 방법으로 추천되는 이유
  https://velog.io/@kylexid/%EC%99%9C-bcrypt-%EC%95%94%ED%98%B8%ED%99%94-%EB%B0%A9%EC%8B%9D%EC%9D%B4-%EC%B6%94%EC%B2%9C%EB%90%98%EC%96%B4%EC%A7%88%EA%B9%8C
- npm i bcrypt
- doc보면 해싱 하는법과 해싱된 값을 로그인시 비교하는 방법이 나와있음

## createAccount시 username과 email이 기존 DB에 존재할때 에러 를 생성하고 해당 에러를 요청에대한 응답으로 처리

## login

- compare password use bcrypt
- if correnct password then return token that create by jsonwebtoken

## jsonwebtoken

- ref: https://www.npmjs.com/package/jsonwebtoken
- npm install jsonwebtoken

1. 로그인시 비밀번호가 같으면 jsonwebtoken으로 토큰을 생성하여 DB에 저장하고 로그인한 유저쪽 client로 token을 반환해준다.
2. 그 다음 로그인한 유저는 브라우저에 token을 저장한다.
3. 로그인한 유저가 로그인한 상태인지 본인인지 확인을 token으로 하는데 이때 저장했던 token을 백엔드로 같이보내서 요청을하고
4. 백엔드는 전달받은 token이 로그인시 저장해뒀던 token과 비교해서 같으면 로그인된 유저라고 판단 후 작업을 시행하고 다르면 작업을 거절한다(이때 작업은 주로 DB접근 관련 작업..)

- 토큰 만드는데 사용되는 jwt.sign의 첫번째 인자는 아무거나 넣어도 되는데 두번째 인자는 비밀키를 입력해야함 아무도 알려주면 안됨 그래서 해당 값을 .env로 뺀다
- 비밀키 생성해주는 사이트
  https://randomkeygen.com/
  CodeIgniter Encryption Keys - Can be used for any other 256-bit key requirement. 에서 사용
- jsonwebtoken npm 에서 확인해보면 언제까지 유효하게 할건지 기간도 정할수 있다.
- jwt.io 에서 jwt관련 각종 정보를 확인할 수 있다

## Reactor that direct structure

## Divide and counquer

## editProfile

- 프리즈마는 update시 undefined값이 들어가면 자동으로 업데이트 해주지 않는다(원래는 예외처리 해줘야함)

## DB제어시 권한 확인하고 제어 with token verify

- 첫번째 방법으로 일단 token을 graphql api argument로 같이 보내는 방법을 사용한다.

## token 보내는 방식 with http headers

- 매번 token을 graphq api arg로 보내기엔 번거롭기에 http headers로 받는 방법을 구현한다.
- ref: https://en.wikipedia.org/wiki/List_of_HTTP_header_fields
  목록중 response 부분에 정보가 있다.

## graphQl context

- contet에 넣어둔 정보는 모든 resolvers(graphql API)의 세번째 agr에서 공유가능하다.
- server.js의 apollo-server객체를 생성할때 context부분 설정이 가능하다.
- graphql context에 headers를 넣어두고 token을 받는 방식으로 해결한다.

## graphql context test

- apollo-server안 context에 임의 변수를 넣어두고
  모든 resolvers에서 context받는 arg를 확인하여 잘 동작하는지 확인한다.
- ref: https://www.apollographql.com/docs/apollo-server/security/authentication/#putting-authenticated-user-info-on-the-context

## get token from headers

## authentication

- 토큰을 http headers로 받고 처리하기
- 처리하는 부분을 utils 모듈화한다

## protect way part2 about authentication

## protectResolver

- api화 시켜서 context로 전달
- protectResolver의 return 방식을 에러를 던지지말고 핸들링 가능하게 변경
- HOC방식으로 처리

## typescript SETUP

- tsconfig에 "esModuleInterop": true 를 추가
- npm install typescript ts-node --save-node
- babel.config 파일 삭제
- 기본 실행 명령어를 "nodemon --exec ts-node src/server.ts" 로 변경

## change to ts form

## set context type

## inject client into context

## set context type with utils

## seeProfile
