import React from 'react';
import styled, { css } from 'styled-components';
import oc from 'open-color';
import { UserState } from '../pages/write';

interface WriteProps {
  year: string;
  month: string;
  closedDate: UserState[] | null;
  onChangeYear: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeMonth: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpload: () => void;
  onSubmit: (e: React.MouseEvent) => void;
}

const Write: React.FC<WriteProps> = ({
  year,
  month,
  closedDate,
  onChangeYear,
  onChangeMonth,
  onUpload,
  onSubmit,
}) => {
  return (
    <WriteBox>
      <h2>휴업 CSV 업로드!</h2>
      <Content>
        <Input
          type="text"
          placeholder="연도 입력(ex: 2020)"
          value={year}
          onChange={onChangeYear}
          autoFocus={true}
        />
        <Input
          type="text"
          value={month}
          onChange={onChangeMonth}
          placeholder="월 입력(ex: 9)"
        />
      </Content>

      <UpButton onClick={onUpload}>CSV 업로드</UpButton>

      <Content>
        <table className="table">
          <thead>
            <tr>
              <th>성명</th>
              <th>휴업일수</th>
              <th>휴업날짜</th>
            </tr>
          </thead>
          <tbody>
            {closedDate ? (
              <>
                {closedDate.map((date, i) => (
                  <tr key={i}>
                    <td>{date.username} 님</td>

                    {date.closed_date.length === 0 ? (
                      <td colSpan={2}>휴업내역 없음</td>
                    ) : (
                      <>
                        <td>{date.closed_date.length} 일</td>
                        <td>
                          <ul>
                            {date.closed_date.map((closed, i) => (
                              <li key={i}>{closed}</li>
                            ))}
                          </ul>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan={3}>데이터가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </Content>
      
      <SubmitButton onClick={onSubmit}>저장하기</SubmitButton>
    </WriteBox>
  );
};

export default Write;

// Styles
const WriteBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  margin-top: 2rem;
  input {
    display: block;
    margin-bottom: 1rem;
  }
  .table {
    width: 100%;
    padding: 0;
    border-radius: 0.8rem;
    overflow: hidden;
  }
  tr {
    transition: 0.15s all;
  }
  tr:hover {
    background: ${oc.indigo[3]};
    color: white;
  }
  th,
  td {
    padding: 0.5rem 1rem;
    text-align: center;
  }
  td {
    border-bottom: 1px solid ${oc.indigo[7]};
  }
  th {
    background: ${oc.indigo[7]};
    color: white;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

const style = css`
  display: block;
  padding: 0;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  width: 100%;
  resize: none;
  line-height: 1.5;
  outline: none;
  border: none;
  font-weight: bold;
  background: ${oc.gray[2]};
  color: ${oc.gray[9]};
  &::placeholder {
    color: ${oc.gray[5]};
  }
`;

const Input = styled.input`
  ${style}
`;

const UpButton = styled.button`
  width: 150px;
  height: 60px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  outline: none;
  border: 1px solid ${oc.indigo[7]};
  border-radius: 0.6rem;
  background: white;
  color: ${oc.indigo[7]};
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s all;
  &:hover {
    background: linear-gradient(to right, ${oc.indigo[6]}, ${oc.cyan[5]});
    color: white;
    border: none;
  }
  &:active {
    transform: translateY(3px);
  }
`;

const SubmitButton = styled.button`
  margin-top: 1rem;
  width: 150px;
  height: 40px;
  outline: none;
  border: 1px solid ${oc.orange[9]};
  border-radius: 0.4rem;
  background: ${oc.orange[9]};
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
  transition: 0.3s all;
  &:hover {
    background: white;
    color: ${oc.orange[9]};
  }
  &:active {
    transform: translateY(3px);
  }
`;
