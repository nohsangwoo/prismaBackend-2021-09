import client from "../../client";
import { Resolver } from "../../types";
import { protectedResolver } from "../users.utils";

const resolverFn: Resolver = async (_, __, { loggedInUser }) => {
    if (!loggedInUser) {
        return null;
    }

    const result = await client.user.findUnique({
        where: {
            id: loggedInUser.id
        }
    });
    return result;
};

export default {
    Query: {
        me: protectedResolver(resolverFn)
    }
};
