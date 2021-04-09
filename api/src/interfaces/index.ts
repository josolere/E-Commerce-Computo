// Types
import { User } from "./types";

// User
export interface iUser extends User {
  id: string;
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
