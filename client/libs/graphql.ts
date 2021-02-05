import { gql } from '@apollo/react-hooks';

// List Closeds
export const LIST_CLOSEDS = gql`
  query ListCloseds($cursor: ID) {
    ListCloseds(cursor: $cursor) {
      ok
      error
      closeds {
        id
        year
        month
        created_at
      }
    }
  }
`;

// Read Closed
export const READ_CLOSED = gql`
  query ReadClosed($id: ID!) {
    ReadClosed(id: $id) {
      ok
      error
      closed {
        id
        year
        month
        users {
          id
          username
          closed_date
          created_at
        }
      }
    }
  }
`;

export interface InputUser {
  username: string;
  closed_date?: string[];
}

// Add Closed
export const ADD_CLOSED = gql`
  mutation AddClosed($year: String!, $month: String!, $users: [InputUser]!) {
    AddClosed(year: $year, month: $month, users: $users) {
      ok
      error
    }
  }
`;

// Remove Closed
export const REMOVE_CLOSED = gql`
  mutation RemoveClosed($id: ID!) {
    RemoveClosed(id: $id) {
      ok
      error
    }
  }
`;
