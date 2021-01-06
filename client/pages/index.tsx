import React from 'react';
import { useRouter } from 'next/router';
import PageTemplate from '../components/common/PageTemplate';
import ListCloseds from '../components/ListCloseds';
import useListCloseds from '../libs/hooks/useListCloseds';
import Loading from '../components/common/Loading';

const IndexPage = () => {
  const router = useRouter();
  const { data, loading, error } = useListCloseds();

  const onRead = (id: string) => {
    router.push(`/closed/${id}`);
  };

  if (error) return null;
  if (loading) return <Loading />;

  return (
    <PageTemplate>
      <ListCloseds closeds={data?.ListCloseds.closeds || null} onRead={onRead} />
    </PageTemplate>
  );
};

export default IndexPage;
