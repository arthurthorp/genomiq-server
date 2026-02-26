import { Email } from "./email.vo";
import { User } from "./user.entity";

export interface IUserRepository {
  findByEmail(email: Email): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
}
