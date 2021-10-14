import client from "../../client";
import { Resolver } from "../../types";

const resolverFn: Resolver = async (_, { userName, page }) => {
  //   console.log("root", root);
  const ok = await client.user.findUnique({
    where: { userName },
    select: { id: true }
  });
  if (!ok) {
    return {
      ok: false,
      error: "User not found"
    };
  }
  const getFollowersLength = 5;
  const followers = await client.user
    .findUnique({ where: { userName } })
    .followers({
      take: getFollowersLength,
      //   첫번째 페이지에선 아무것도 skip할것이 없으니 -1처리를 기본으로 해준
      skip: (page - 1) * getFollowersLength
    });

  const totalFollowers = await client.user.count({
    where: {
      following: {
        some: {
          userName
        }
      }
    }
  });
  //   console.log(followers);
  return {
    ok: true,
    followers,
    totalPages: Math.ceil(totalFollowers / getFollowersLength)
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
