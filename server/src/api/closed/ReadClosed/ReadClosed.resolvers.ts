import { getRepository } from 'typeorm';
import { ReadClosedQueryArgs, ReadClosedResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import Closed from '../../../entities/Closed';

const resolvers: Resolvers = {
  Query: {
    ReadClosed: async (_, args: ReadClosedQueryArgs): Promise<ReadClosedResponse> => {
      const { id } = args;

      try {
        const closed = await getRepository(Closed).findOne(
          { id },
          { relations: ['users'] }
        );

        if (!closed) {
          return {
            ok: false,
            error: 'Not exist closed',
            closed: null,
          };
        }

        return {
          ok: true,
          error: null,
          closed,
        };
      } catch (err) {
        return {
          ok: false,
          error: err.message,
          closed: null,
        };
      }
    },
  },
};

export default resolvers;
