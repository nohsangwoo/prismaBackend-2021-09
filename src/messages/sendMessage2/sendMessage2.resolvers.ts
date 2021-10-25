import client from "../../client";
import { Resolver } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolverFn: Resolver = async (
  _,
  { payload, roomId, userId },
  { loggedInUser }
) => {
  if (!loggedInUser) {
    return {
      ok: false,
      error: "you need to login"
    };
  }

  console.log(roomId, userId);
  if (roomId) {
    const existRoom = await client.room.findUnique({
      where: {
        id: roomId
      },
      select: {
        id: true
      }
    });
    if (!existRoom) {
      return {
        ok: false,
        error: "Room not found."
      };
    }
  }

  let existUser = null;
  if (userId) {
    existUser = await client.user.findUnique({
      where: {
        id: userId
      },
      select: {
        id: true
      }
    });
    if (!existUser) {
      return {
        ok: false,
        error: "This user does not exist."
      };
    }
  }

  // roomId, userId를 예외 처리해서 해결하면 될 듯
  // condition이란 변수안에 roomI만 존재할때와 userId만 존재할때를 다르게 조건을 걸어서
  // connectOrCreate조건을 만들어준다.
  const message = await client.message.create({
    data: {
      payload,
      room: {
        connectOrCreate: {
          where: {
            id: 12
          },
          create: {
            users: {
              connect: [
                {
                  id: 5
                },
                {
                  id: loggedInUser.id
                }
              ]
            }
          }
        }
      },
      user: {
        connect: {
          id: loggedInUser.id
        }
      }
    }
  });

  return {
    ok: true,
    id: message.id
  };
};

export default {
  Mutation: {
    sendMessage2: protectedResolver(resolverFn)
  }
};
