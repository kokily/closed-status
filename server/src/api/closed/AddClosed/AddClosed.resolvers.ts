import { getRepository } from 'typeorm';
import { AddClosedMutationArgs, AddClosedResponse } from '../../../types/graph';
import { Resolvers } from '../../../types/resolvers';
import masking from '../../../libs/masking';
import Closed from '../../../entities/Closed';
import User from '../../../entities/User';

const resolvers: Resolvers = {
  Mutation: {
    AddClosed: async (_, args: AddClosedMutationArgs): Promise<AddClosedResponse> => {
      const { year, month, users } = args;

      try {
        const closed = await getRepository(Closed).create({ year, month });

        await closed.save();

        const updateUsers = users.map((user) => ({
          ...user,
          username: masking(user.username),
          closedId: closed.id,
        }));

        await getRepository(User).save(updateUsers);

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
