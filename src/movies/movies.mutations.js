import client from "../client";

export default {
  Mutation: {
    createMovie: (root, { title, year, genre }) => {
      return client.movie.create({
        data: {
          title,
          year,
          genre
        }
      });
    },
    deleteMovie: (root, { id }, context, info) => {
      return client.movie.delete({
        where: {
          id
        }
      });
    },
    updateMovie: (_, { id, year }) => {
      return client.movie.update({
        where: {
          id
        },
        data: {
          year
        }
      });
    }
  }
};
