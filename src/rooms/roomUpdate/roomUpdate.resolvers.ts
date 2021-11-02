import { withFilter } from "graphql-subscriptions";
import client from "../../client";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { Resolver } from "../../types";

const resolverFn: Resolver = async (
  { roomUpdates },
  { id },
  { loggedInUser }
) => {
  console.log("activate room update!");

  console.log(roomUpdates, id);
  return roomUpdates.roomId === id;
};

export default {
  Subscription: {
    roomUpdates: {
      // asyncIterator안에 들어가는 내용이 트리거
      // - 두번째 인자는 return 값이 true인경우 subscribtion 리스닝하는 필터내용(resolver함수를 사용한다.)
      subscribe: withFilter(() => pubsub.asyncIterator(NEW_MESSAGE), resolverFn)
    }
  }
};
