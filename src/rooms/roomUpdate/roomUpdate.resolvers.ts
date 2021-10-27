import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";

export default {
  Subscription: {
    roomUpdates: {
      // asyncIterator안에 들어가는 내용이 트리거
      subscription: () => pubsub.asyncIterator(NEW_MESSAGE)
    }
  }
};
