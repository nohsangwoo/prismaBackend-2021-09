import client from "../client";
import { Resolver } from "../types";

// likes로 부터 id(like id)를 물려받음
const photoResolverFn: Resolver = async ({ id }) => {
  console.log(id);
  const result = await client.like
    .findUnique({
      where: {
        id
      },
      select: {
        photo: true
      }
    })
    .photo();
  console.log(result);
  return result;
};
export default {
  Like: {
    photo: photoResolverFn
  }
};
