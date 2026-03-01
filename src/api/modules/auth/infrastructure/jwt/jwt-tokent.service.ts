import { SignJWT, jwtVerify } from "jose";
import { ITokenService } from "@/api/modules/auth/ports/token-service";
import { env } from "@/shared/config/env";

const encoder = new TextEncoder();

export class JWTTokenService implements ITokenService {
  private secret = encoder.encode(env.JWT_SECRET);

  async signAccessToken(payload: { userId: string }) {
    return await new SignJWT({})
      .setProtectedHeader({ alg: "HS256" })
      .setSubject(payload.userId)
      .setIssuedAt()
      .setExpirationTime(env.JWT_EXPIRES_IN)
      .sign(this.secret);
  }

  async verifyAccessToken(token: string) {
    const { payload } = await jwtVerify(token, this.secret);
    if (!payload.sub) throw new Error("Invalid token");
    return { userId: String(payload.sub) };
  }
}
