import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import { READ_CLOSED } from '../../libs/graphql';
import { ClosedType } from '../../libs/types';
import Loading from '../../components/common/Loading';
import PageTemplate from '../../components/common/PageTemplate';
import ReadClosed from '../../components/ReadClosed';

const ClosedPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useQuery<{
    ReadClosed: { closed: ClosedType | null };
  }>(READ_CLOSED, {
    variables: { id },
  });

  if (error) return null;
  if (loading) return <Loading />;

  return (
    <PageTemplate>
      <ReadClosed closed={data?.ReadClosed.closed || null} />
    </PageTemplate>
  );
};

export default ClosedPage;
