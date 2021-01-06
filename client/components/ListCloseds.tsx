import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { ClosedType } from '../libs/types';
import media from '../libs/styles/media';

interface ListClosedsProps {
  closeds: ClosedType[] | null;
  onRead: (id: string) => void;
}

const ListCloseds: React.FC<ListClosedsProps> = ({ closeds, onRead }) => {
  return (
    <ListBox>
      <h2>휴업 현황 리스트</h2>

      <table className="table">
        <thead>
          <tr>
            <th>해당연도</th>
            <th>해당 월</th>
          </tr>
        </thead>
        <tbody>
          {closeds && closeds.length !== 0 ? (
            <>
              {closeds.map((closed) => (
                <tr key={closed.id} onClick={() => onRead(closed.id)}>
                  <td>{closed.year} 년</td>
                  <td>{closed.month} 월</td>
                </tr>
              ))}
            </>
          ) : (
            <tr>
              <td colSpan={2}>작성된 내역이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </ListBox>
  );
};

export default ListCloseds;

// Styles
const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  ${media.small} {
    width: 100%;
  }
  .table {
    width: 100%;
    padding: 0;
    border-radius: 0.8rem;
    overflow: hidden;
  }
  tr {
    transition: 0.2s all;
    cursor: pointer;
  }
  tr:hover {
    background: ${oc.grape[1]};
  }
  th,
  td {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    text-align: center;
  }
  th {
    background: linear-gradient(to right, ${oc.indigo[4]}, ${oc.cyan[4]});
    color: white;
  }
  td {
    font-weight: 500;
    color: ${oc.gray[9]};
  }
`;
