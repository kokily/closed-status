import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { ClosedType } from '../libs/types';
import media from '../libs/styles/media';

interface ReadClosedProps {
  closed: ClosedType | null;
}

const ReadClosed: React.FC<ReadClosedProps> = ({ closed }) => {
  return (
    <ClosedBox>
      {closed.users && (
        <WhiteBoard>
          <InfoHeader>
            <h2>
              {closed.year}년 {closed.month}월 휴업 세부현황
            </h2>
          </InfoHeader>

          <DownBorder />

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
                {closed.users.length !== 0 &&
                  closed.users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.username} 님</td>
                      <td>
                        {user.closed_date.length === 0
                          ? '없음'
                          : `${user.closed_date.length} 일`}
                      </td>
                      <td>
                        <ul>
                          {user.closed_date.map((date, i) => (
                            <li key={i}>{date}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Content>
        </WhiteBoard>
      )}
    </ClosedBox>
  );
};

export default ReadClosed;

// Styles
const ClosedBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WhiteBoard = styled.div`
  width: 80%;
`;

const InfoHeader = styled.div`
  text-align: center;
`;

const DownBorder = styled.div`
  margin-left: 5rem;
  margin-right: 5rem;
  height: 3px;
  background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
  ${media.medium} {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`;

const Content = styled.div`
  margin-top: 1rem;
  .table {
    width: 100%;
    padding: 0;
    border-radius: 0.8rem;
    overflow: hidden;
  }
  tr:hover {
    background: ${oc.teal[5]};
    color: white;
  }
  th,
  td {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    text-align: center;
    font-weight: 500;
  }
  th {
    background: linear-gradient(to right, ${oc.indigo[4]}, ${oc.cyan[4]});
    color: white;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;
