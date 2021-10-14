import client from "../../client";
import { Resolver } from "../../types";

const resolverFn: Resolver = async (_, { userName, page }) => {
  const followers = await client.user
    .findUnique({ where: { userName } })
    .followers({
      take: 5,
      //   첫번째 페이지에선 아무것도 skip할것이 없으니 -1처리를 기본으로 해준
      skip: (page - 1) * 5
    });

  console.log(followers);
  return {
    ok: true,
    followers
  };

  //   const aFollowers = await client.user
  //     .findUnique({
  //       where: {
  //         userName
  //       }
  //     })
  //     .followers();
  //   console.log("aFollowers", aFollowers);
  //   const bFollowers = await client.user.findMany({
  //     where: {
  //       following: {
  //         some: {
  //           userName
  //         }
  //       }
  //     }
  //   });
  //   console.log("bFollowers", bFollowers);
};

export default {
  Query: {
    seeFollowers: resolverFn
  }
};
