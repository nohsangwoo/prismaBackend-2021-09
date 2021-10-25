import client from "../../client";
import { Resolver } from "../../types";

const resolverFn: Resolver = async (_, { id }, { loggedInUser }) => {
  if (!loggedInUser) {
    return {
      ok: false,
      error: "you need to login"
    };
  }
  const existMessage = client.message.findFirst({
    where: {
      // 전달받은 message id
      id: id,
      //  로그인한 유저의 id가 아닌 것(메시지 읽음 처리는 다른 사람의 메시지를 확인했는지 여부를 보니깐)
      userId: {
        not: loggedInUser.id
      },

      //   메시지가 포함된 방에 login user가 존재하는지 확인
      room: {
        users: {
          some: {
            id: loggedInUser.id
          }
        }
      }
    },
    select: {
      id: true
    }
  });
  if (!existMessage) {
    return {
      ok: false,
      error: "Message not found."
    };
  }
  await client.message.update({
    where: {
      id
    },
    data: {
      read: true
    }
  });
  return {
    ok: true
  };
};

export default {
  Mutation: {
    readMessage: resolverFn
  }
};
