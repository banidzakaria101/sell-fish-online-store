import { Role } from "../enums/role";

export interface User {
  id: number;
  username: string;
  password: string;
  role: Role;
  email: string;
  phoneNumber: string;
  address: string;
}
