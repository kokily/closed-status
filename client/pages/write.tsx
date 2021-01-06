import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import PageTemplate from '../components/common/PageTemplate';
import { useMutation } from '@apollo/react-hooks';
import { ADD_CLOSED } from '../libs/graphql';
import { toast } from 'react-toastify';
import { devServer, prodServer } from '../libs/constants';
import Write from '../components/Write';

export interface UserState {
  username: string;
  closed_date: string[];
}

const WritePage = () => {
  const router = useRouter();
  const [AddClosed, { client }] = useMutation(ADD_CLOSED);
  const [closedDate, setClosedDate] = useState<UserState[]>(null);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

  const onChangeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value);
  };

  const onChangeMonth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(e.target.value);
  };

  const onUpload = () => {
    if (window.prompt('비밀번호는???') !== '0711') {
      toast.error('누구냐 넌!!!');
      return;
    }

    const upload = document.createElement('input');

    upload.type = 'file';
    upload.onchange = (e) => {
      if (!upload.files) return;

      const file = upload.files[0];
      const formData = new FormData();

      formData.append('file', file);

      return axios
        .post(
          process.env.NODE_ENV === 'production'
            ? `${prodServer}/upload`
            : `${devServer}/upload`,
          formData
        )
        .then((res) => {
          return axios
            .get(
              process.env.NODE_ENV === 'production'
                ? `${prodServer}/upload/${res.data.key}`
                : `${devServer}/upload/${res.data.key}`
            )
            .then((res) => {
              const data = res.data;

              const closedDate = data.map((datum) => {
                Object.keys(datum).forEach((key) => {
                  if (datum[key] === '') delete datum[key];
                });

                let date = Object.keys(datum);

                return {
                  username: datum.성명,
                  closed_date: date.filter((value) => {
                    return value !== '성명' && value !== '계';
                  }),
                };
              });

              setClosedDate(closedDate);
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    };

    upload.click();
  };

  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    if ([year, month].includes('') && closedDate === null) {
      toast.error('데이터를 전부 입력하세요');
      return;
    }

    try {
      const response = await AddClosed({
        variables: { year, month, users: closedDate },
      });

      if (!response || !response.data) return;

      await client.clearStore();
      toast.success('저장 성공!');

      router.push('/');
    } catch (error) {}
  };

  return (
    <PageTemplate>
      <Write
        year={year}
        month={month}
        closedDate={closedDate}
        onChangeYear={onChangeYear}
        onChangeMonth={onChangeMonth}
        onUpload={onUpload}
        onSubmit={onSubmit}
      />
    </PageTemplate>
  );
};

export default WritePage;
