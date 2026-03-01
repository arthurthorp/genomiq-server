import { IHashService } from "@/shared/domain/ports/hash.interface";

export class BunHashService implements IHashService {
  private readonly algorithm = "bcrypt";

  async hash(value: string): Promise<string> {
    return Bun.password.hash(value, this.algorithm);
  }

  async compare(value: string, hashed: string): Promise<boolean> {
    return Bun.password.verify(value, hashed, this.algorithm);
  }
}
