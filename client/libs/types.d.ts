export interface UserType {
  id: string;
  username: string;
  closed_date: string[] | null;
  closedId: string;
  closed: ClosedType;
  created_at: string;
}

export interface ClosedType {
  id: string;
  year: string;
  month: string;
  users: UserType[] | null;
  created_at: string;
}
