import client from "../client";
import { Resolver } from "../types";

const usersResolverFn: Resolver = async ({ id }) => {
    const result = await client.room.findUnique({ where: { id } }).users();
    return result;
};

const messagesResolverFn: Resolver = async ({ id }) => {
    const result = await client.message.findMany({
        where: {
            roomId: id
        },
        orderBy: {
            createdAt: "asc"
        }
    });
    return result;
};

const unreadTotalResolverFn: Resolver = async ({ id }, _, { loggedInUser }) => {
    if (!loggedInUser) {
        return 0;
    }
    const result = await client.message.count({
        where: {
            read: false,
            roomId: id,
            user: {
                id: {
                    //id: loggedInUser.id가 아닌 조건
                    not: loggedInUser.id
                }
            }
        }
    });
    return result;
};
export default {
    Room: {
        users: usersResolverFn,
        messages: messagesResolverFn,
        unreadTotal: unreadTotalResolverFn
    }
};
