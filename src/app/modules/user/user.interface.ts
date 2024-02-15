export const USER_ROLE = {
  manager: "manager",
  salesman: "salesman",
  member: "member",
} as const;

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: "manager" | "salesman" | "member";
}
