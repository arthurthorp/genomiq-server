import { Email } from "./email.vo";

export class User {
  private constructor(
    public readonly id: string,
    public email: Email,
    private password: string,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(params: { id: string; email: Email; password: string }): User {
    return new User(
      params.id,
      params.email,
      params.password,
      new Date(),
      new Date(),
    );
  }

  static reconstitute(params: {
    id: string;
    email: Email;
    password: string;
    createdAt: Date;
    updatedAt: Date;
  }): User {
    return new User(
      params.id,
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
