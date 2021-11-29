import client from "../client";
import { Resolver } from "../types";

const userResolverFn: Resolver = async ({ id }) => {
    const result = await client.message
        .findUnique({
            where: {
                id
            },
            select: {
                user: true
            }
        })
        .user();
    return result;
};

export default {
    Message: {
        user: userResolverFn
    }
};
