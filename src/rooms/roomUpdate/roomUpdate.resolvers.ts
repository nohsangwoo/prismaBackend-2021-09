import { withFilter } from "graphql-subscriptions";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";

export default {
  Subscription: {
    roomUpdates: {
      // asyncIterator안에 들어가는 내용이 트리거
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_MESSAGE),
        async ({ roomUpdates }, variables) => {
          console.log("일단 subscription 작동");
          console.log(roomUpdates, variables);
          return true;
        }
      )
    }
  }
};
