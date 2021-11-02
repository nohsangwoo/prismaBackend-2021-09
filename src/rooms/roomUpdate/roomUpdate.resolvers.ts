import { withFilter } from "graphql-subscriptions";
import client from "../../client";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { Resolver } from "../../types";

// withFilter 두번째 인자
// 전달받은 id와 roomUpdates가 subscriptions 하고있는 곳에서 반환받는 roomId가 같은경우 실행됨
// fillter function임
// 아래의 조건에서만 작동한다는 뜻
// roomUpdates은 구독하고 있는 sendMessage에서 실시간으로 전달 받고있는 roomId와 payload중 roomId에 관한 내용
// 이 함수는 sendMessage에서  pubsub.publish로 트리거가 건들여 질때 실행되는 함수
const withFilterResolverFn: Resolver = async (
  { roomUpdates },
  { id },
  { loggedInUser }
) => {
  console.log("activate room update!");
  if (!loggedInUser) {
    throw new Error("You need to login");
  }
  // 만약 event를 준 room을 리스닝 하고있다면(subscriptions 하고있는 대상의 roomId와 subscriptions의 결과로 반환받은 id가 같다면  ==> 무결성 확인하는 작업)
  // 리스닝하고 있는 room이 우리에게 event를 준 room이 맞는지 확인해야함
  // 해당 방의 멤버가 맞는지 확인하는 작업임(헤당 room에서 users의 목록중 로그인한 유저의 id가 존재한다면 roomId를 반환)
  if (roomUpdates.roomId === id) {
    const room = await client.room.findFirst({
      where: {
        id,
        users: {
          some: {
            id: loggedInUser.id
          }
        }
      },
      select: {
        id: true
      }
    });
    // 해당방의 멤버가 아니라는 결과가 나오면 false반환
    if (!room) {
      return false;
    }
    // 해당방의 멤버가 맞다는 결과가 나오면 true반환
    return true;
  }
};

const subscribeResolverFn: Resolver = async (root, args, context, info) => {
  if (!context.loggedInUser) {
    throw new Error("You need to login");
  }

  const room = await client.room.findFirst({
    where: {
      id: args.id,
      users: {
        some: {
          id: context.loggedInUser.id
        }
      }
    },
    select: {
      id: true
    }
  });
  // 해당 방의 멤버가 아니라면 리스닝 권한 없음 에러 핸들링
  if (!room) {
    throw new Error("You shall not see this.");
  }

  return withFilter(
    () => pubsub.asyncIterator(NEW_MESSAGE),
    withFilterResolverFn
  )(root, args, context, info);
};

export default {
  Subscription: {
    roomUpdates: {
      // asyncIterator안에 들어가는 내용이 트리거
      // - 두번째 인자는 return 값이 true인경우 subscribtion 리스닝하는 필터내용(resolver함수를 사용한다.)
      subscribe: subscribeResolverFn
    }
  }
};
