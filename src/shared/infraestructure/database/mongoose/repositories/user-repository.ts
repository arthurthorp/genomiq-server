import { IUserRepository } from "@/shared/domain/users/user.repository";
import { User } from "@/shared/domain/users/user.entity";
import { Email } from "@/shared/domain/users/email.vo";
import { UserModel } from "../schemas/user.schema";
import { IUserDocument } from "../schemas/user.types";

export class UserRepository implements IUserRepository {
  private toEntity(doc: IUserDocument): User {
    return User.reconstitute({
      id: doc._id.toString(),
      name: doc.name,
      email: new Email(doc.email),
      password: doc.password,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  async findByEmail(email: Email): Promise<User | null> {
    const doc = await UserModel.findOne({ email: email.value });
    if (!doc) return null;

    return this.toEntity(doc);
  }

  async findById(id: string): Promise<User | null> {
    const doc = await UserModel.findById(id);
    if (!doc) return null;

    return this.toEntity(doc);
  }

  async save(user: User): Promise<void> {
    await UserModel.updateOne(
      { _id: user.id },
      {
        name: user.name,
        email: user.email.value,
        password: user.getPassword(),
      },
      { upsert: true },
    );
  }
}
