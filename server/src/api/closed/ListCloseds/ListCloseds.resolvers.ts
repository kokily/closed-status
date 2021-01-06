import { getManager, getRepository } from 'typeorm';
import { ListClosedsQueryArgs, ListClosedsResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import Closed from '../../../entities/Closed';

const resolvers: Resolvers = {
  Query: {
    ListCloseds: async (_, args: ListClosedsQueryArgs): Promise<ListClosedsResponse> => {
      const { cursor } = args;

      try {
        const query = await getManager()
          .createQueryBuilder(Closed, 'closed')
          .limit(15)
          .orderBy('closed.created_at', 'DESC')
          .addOrderBy('closed.id', 'DESC');

        if (cursor) {
          const closed = await getRepository(Closed).findOne({ id: cursor });

          if (!closed) {
            return {
              ok: false,
              error: 'Not exist closed',
              closeds: null,
            };
          }

          query.andWhere('closed.created_at < :date', {
            date: closed.created_at,
          });

          query.orWhere('closed.created_at = :date AND closed.id < :id', {
            date: closed.created_at,
            id: closed.id,
          });
        }

        const closeds = await query.getMany();

        return {
          ok: true,
          error: null,
          closeds,
        };
      } catch (err) {
        return {
          ok: false,
          error: err.message,
          closeds: null,
        };
      }
    },
  },
};

export default resolvers;
