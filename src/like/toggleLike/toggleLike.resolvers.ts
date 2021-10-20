import client from "../../client";
import { Resolver } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolverFn: Resolver = async (_, { id }, { loggedInUser }) => {
  if (!loggedInUser) {
    return {
      ok: false,
      error: "you need to login"
    };
  }
  const existPhoto = await client.photo.findUnique({
    where: {
      id
    }
  });

  if (!existPhoto) {
    return {
      ok: false,
      error: "Photo not found"
    };
  }

  // 로그인한 유저와 좋아요할 대상의 photo unique set가 존재하는지 확인
  const like = await client.like.findUnique({
    where: {
      userId_photoId: {
        userId: id,
        photoId: loggedInUser?.id
      }
    }
  });

  // 존재하면 좋아요 해제
  // 존재하지 않으면 좋아요
  if (like) {
    await client.like.delete({
      where: {
        userId_photoId: {
          userId: loggedInUser.id,
          photoId: id
        }
      }
    });
  } else {
    await client.like.create({
      // 이때 만드는 조건은
      data: {
        // 로그인한 유저에게 연결하고
        user: {
          connect: {
            id: loggedInUser.id
          }
        },
        // 전달받은 사진의 id에 연결한다
        photo: {
          connect: {
            id: existPhoto.id
          }
        }
      }
    });
  }
  const result = { ok: true };
  return result;
};

export default {
  Mutation: {
    toggleLike: protectedResolver(resolverFn)
  }
};
