export class Email {
  private constructor(public readonly value: string) {}

  static create(value: string): Email {
    if (!value.includes("@")) {
      throw new Error("Invalid email");
    }

    return new Email(value.toLowerCase());
  }

  equals(other: Email) {
    return this.value === other.value;
  }
}
