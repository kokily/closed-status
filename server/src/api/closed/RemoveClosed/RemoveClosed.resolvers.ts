import { getRepository } from 'typeorm';
import { RemoveClosedMutationArgs, RemoveClosedResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import Closed from '../../../entities/Closed';

const resolvers: Resolvers = {
  Mutation: {
    RemoveClosed: async (
      _,
      args: RemoveClosedMutationArgs
    ): Promise<RemoveClosedResponse> => {
      const { id } = args;

      try {
        await getRepository(Closed).delete(id);

        return {
          ok: true,
          error: null,
        };
      } catch (err) {
        return {
          ok: false,
          error: err.message,
        };
      }
    },
  },
};

export default resolvers;
