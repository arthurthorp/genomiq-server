import { HashedPassword } from "./hashed-password.vo";
import { IHashService } from "../services/hash.interface";

export class Password {
  private constructor(public readonly value: string) {}

  static create(value: string): Password {
    if (!Password.isValid(value)) {
      throw new Error(
        "Senha inválida: 6-20 caracteres, letras maiúsculas, minúsculas, números e caracteres especiais",
      );
    }
    return new Password(value);
  }

  static isValid(password: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,20}$/;
    return regex.test(password);
  }

  async hash(hashService: IHashService): Promise<HashedPassword> {
    const hashed = await hashService.hash(this.value);
    return HashedPassword.create(hashed);
  }
}
