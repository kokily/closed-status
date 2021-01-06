export const typeDefs = ["type AddClosedResponse {\n  ok: Boolean!\n  error: String\n}\n\ninput InputUser {\n  username: String!\n  closed_date: [String]\n}\n\ntype Mutation {\n  AddClosed(year: String!, month: String!, users: [InputUser]!): AddClosedResponse!\n}\n\ntype ListClosedsResponse {\n  ok: Boolean!\n  error: String\n  closeds: [Closed]\n}\n\ntype Query {\n  ListCloseds(cursor: ID): ListClosedsResponse!\n  ReadClosed(id: ID!): ReadClosedResponse!\n}\n\ntype ReadClosedResponse {\n  ok: Boolean!\n  error: String\n  closed: Closed\n}\n\ntype Closed {\n  id: ID!\n  year: String!\n  month: String!\n  users: [User]\n  created_at: Date!\n}\n\nscalar Date\n\ntype User {\n  id: ID!\n  username: String!\n  closed_date: [String]\n  closedId: String!\n  closed: Closed\n  created_at: Date!\n}\n"];
/* tslint:disable */

export interface Query {
  ListCloseds: ListClosedsResponse;
  ReadClosed: ReadClosedResponse;
}

export interface ListClosedsQueryArgs {
  cursor: string | null;
}

export interface ReadClosedQueryArgs {
  id: string;
}

export interface ListClosedsResponse {
  ok: boolean;
  error: string | null;
  closeds: Array<Closed> | null;
}

export interface Closed {
  id: string;
  year: string;
  month: string;
  users: Array<User> | null;
  created_at: Date;
}

export interface User {
  id: string;
  username: string;
  closed_date: Array<string> | null;
  closedId: string;
  closed: Closed | null;
  created_at: Date;
}

export type Date = any;

export interface ReadClosedResponse {
  ok: boolean;
  error: string | null;
  closed: Closed | null;
}

export interface Mutation {
  AddClosed: AddClosedResponse;
}

export interface AddClosedMutationArgs {
  year: string;
  month: string;
  users: Array<InputUser>;
}

export interface InputUser {
  username: string;
  closed_date: Array<string> | null;
}

export interface AddClosedResponse {
  ok: boolean;
  error: string | null;
}
