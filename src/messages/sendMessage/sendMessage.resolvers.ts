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

  //   createMessage할때 message에서 connect용으로 사용하기위한 room
  let existRoom = null;

  // room을 기준으로 메시지 보내는 경우(기존에 방이 존재하는 경우)
  if (roomId) {
    //  1. room유효성 검사
    existRoom = await client.room.findUnique({
      where: {
        id: roomId
      },
      select: {
        id: true
      }
    });
    // 2. room 존재하지 않으면 에러 핸들링
    if (!existRoom) {
      return {
        ok: false,
        error: "Room not found."
      };
    }
  }
  //   end of roomId's Preprocessing

  if (userId) {
    //   1. 전달받은 userId가 존재하는지 유효성 검사
    const existUser = await client.user.findUnique({
      where: {
        id: userId
      },
      select: {
        id: true
      }
    });
    // 2. 메시지를 보내려는 대상 userId가 존재하지 않으면 에러 핸들링
    if (!existUser) {
      return {
        ok: false,
        error: "This user does not exist."
      };
    }

    // 3. 메시지를 보내는자, 받는자의 user를 묶어서 room을 생성
    existRoom = await client.room.create({
      data: {
        users: {
          connect: [
            {
              id: userId
            },
            {
              id: loggedInUser.id
            }
          ]
        }
      }
    });
  }
  //   end of userId's Preprocessing

  if (!existRoom) {
    return {
      ok: false,
      error: ""
    };
  }

  // userId or roomId의 전처리 과정이 끝났다면 메시지를 보낸다.
  // 메시지를 보내려는 방(room), 보내는 사람 (sender의 id)의 연결관계를 가지고 message생성해준다
  const message = await client.message.create({
    data: {
      payload,
      room: {
        connect: {
          id: existRoom.id
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
    sendMessage: protectedResolver(resolverFn)
  }
};
