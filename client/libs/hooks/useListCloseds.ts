import { useQuery } from '@apollo/react-hooks';
import { useState, useCallback } from 'react';
import { LIST_CLOSEDS } from '../graphql';
import { ClosedType } from '../types';
import useScroll from './useScroll';

const useListCloseds = () => {
  const { data, loading, error, fetchMore } = useQuery<{
    ListCloseds: { closeds: ClosedType[] | null };
  }>(LIST_CLOSEDS);
  const [isFinished, setIsFinished] = useState(false);

  const onLoadMore = useCallback(
    (cursor: string) => {
      fetchMore({
        variables: { cursor },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          if (fetchMoreResult) {
            setIsFinished(true);
          }

          return {
            ListClosed: {
              ...prev.ListCloseds,
              closeds: [
                ...prev.ListCloseds.closeds,
                ...fetchMoreResult.ListCloseds.closeds,
              ],
            },
          };
        },
      });
    },
    [fetchMore]
  );

  const cursor = data?.ListCloseds?.closeds[data.ListCloseds.closeds.length - 1]?.id;

  useScroll({
    cursor,
    onLoadMore,
  });

  return { data, loading, error, isFinished };
};

export default useListCloseds;
