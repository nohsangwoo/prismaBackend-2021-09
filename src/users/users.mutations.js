import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password }
    ) => {
      try {
        // check if userName  or email are already on DB.
        // because they are(userName and email) unique type.
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                userName
              },
              {
                email
              }
            ]
          }
        });
        // 계정생성시 유저이름과 이메일이 기존에 존재한다면 에러를 뿜어준다.
        if (existingUser) {
          throw new Error("This username/email is already taken.");
        }
        const uglyPassword = await bcrypt.hash(password, 10);

        /*
      const user = await client.user.create({
          ...
      return user
      와 같은 의미
      */

        return client.user.create({
          data: {
            firstName,
            lastName,
            userName,
            email,
            password: uglyPassword
          }
        });
      } catch (e) {
        return e;
      }
    },
    login: async (_, { userName, password }) => {
      console.log("login activate");
      try {
        const user = await client.user.findFirst({
          where: {
            userName
          }
        });

        // const user = await client.user.findFirst({ where: { userName } });

        // 일단 유저가 존재하는지 체크
        if (!user) {
          return {
            ok: false,
            error: "User not found"
          };
        }

        console.log("user", user);
        // 유저 존재하면 bcrypt를 이용하여 해싱된 패스워드와 비교해서 동일한 패스워드인지 비교한다.
        const passwordOk = await bcrypt.compare(password, user.password);
        console.log("passwordOk", passwordOk);
        if (!passwordOk) {
          return {
            ok: false,
            error: "Incorrect password"
          };
        }

        // sign의 첫번째 인자는 아무거나 넣어도 되는데
        // 두번째 인자는 비밀키를 입력해야함 아무도 알려주면 안됨 그래서 .env로 뺀다
        const token = await jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET_KEY
        );

        console.log("token", token);
        // 패스워드까지 맞으면 토큰 반환
        return {
          ok: true,
          token
        };
      } catch (e) {
        return e;
      }
    }
  }
};
