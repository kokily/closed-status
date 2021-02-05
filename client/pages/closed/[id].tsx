import React from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { READ_CLOSED, REMOVE_CLOSED } from '../../libs/graphql';
import { ClosedType } from '../../libs/types';
import Loading from '../../components/common/Loading';
import PageTemplate from '../../components/common/PageTemplate';
import ReadClosed from '../../components/ReadClosed';
import { toast } from 'react-toastify';

const ClosedPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useQuery<{
    ReadClosed: { closed: ClosedType | null };
  }>(READ_CLOSED, {
    variables: { id },
  });
  const [RemoveClosed, { client }] = useMutation(REMOVE_CLOSED);

  const onRemoveClosed = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (window.prompt('비밀번호는???') !== '0711') {
      toast.error('누구냐 넌!!!');
      return;
    }

    try {
      const response = await RemoveClosed({
        variables: { id },
      });

      if (!response || !response.data) return;

      await client.clearStore();

      toast.success('삭제 완료');
      router.push('/');
    } catch (err) {
      toast.error(err);
    }
  };

  if (error) return null;
  if (loading) return <Loading />;

  return (
    <PageTemplate>
      <ReadClosed
        closed={data?.ReadClosed.closed || null}
        onRemoveClosed={onRemoveClosed}
      />
    </PageTemplate>
  );
};

export default ClosedPage;
