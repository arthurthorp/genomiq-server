export class Email {
  public readonly value: string;

  constructor(value: string) {
    if (!value.includes("@")) {
      throw new Error("Invalid email");
    }

    this.value = value.toLowerCase();
  }

  equals(other: Email) {
    return this.value === other.value;
  }
}
