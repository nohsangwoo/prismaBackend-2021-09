import client from "../../client";
import { Resolver } from "../../types";
const resolverFn: Resolver = async (_, { keyword }) => {
    const result = await client.photo.findMany({
        where: {
            caption: {
                contains: keyword
            }
        }
    });
    return result;
};
export default {
    Query: {
        searchPhotos: resolverFn
    }
};
