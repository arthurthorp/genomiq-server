import crypto from "crypto";

export class RefreshToken {
  private constructor(public readonly value: string) {}

  static generate() {
    return new RefreshToken(crypto.randomBytes(32).toString("base64url"));
  }

  static from(value: string) {
    if (!value || value.length < 20) throw new Error("Invalid refresh token");
    return new RefreshToken(value);
  }

  hash() {
    return crypto.createHash("sha256").update(this.value).digest("hex");
  }
}
