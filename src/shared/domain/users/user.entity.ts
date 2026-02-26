import { Email } from "./email.vo";
import { HashedPassword } from "./hashed-password.vo";

export class User {
  private constructor(
    public readonly id: string,
    public name: string,
    public email: Email,
    private password: HashedPassword,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(params: {
    id: string;
    name: string;
    email: Email;
    password: HashedPassword;
  }): User {
    return new User(
      params.id,
      params.name,
      params.email,
      params.password,
      new Date(),
      new Date(),
    );
  }

  static reconstitute(params: {
    id: string;
    name: string;
    email: Email;
    password: HashedPassword;
    createdAt: Date;
    updatedAt: Date;
  }): User {
    return new User(
      params.id,
      params.name,
      params.email,
      params.password,
      params.createdAt,
      params.updatedAt,
    );
  }

  changeEmail(email: Email) {
    this.email = email;
  }

  getPassword() {
    return this.password;
  }
}
