import client from "../../client";
import bcrypt from "bcrypt";
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
    }
  }
};
