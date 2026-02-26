export class HashedPassword {
  private constructor(public readonly value: string) {}

  static create(hashed: string): HashedPassword {
    if (!hashed) throw new Error("Invalid hashed password");
    return new HashedPassword(hashed);
  }
}
