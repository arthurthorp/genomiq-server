import { Elysia } from "elysia";
import { JWTTokenService } from "../infrastructure/jwt/jwt-tokent.service";

export type AuthPayload = { userId: string };

export const authMiddleware = new Elysia({ name: "auth-middleware" })
  .decorate("auth", null as AuthPayload | null)
  .derive(async ({ headers }) => {
    const header = headers.authorization;
    if (!header?.startsWith("Bearer "))
      return { auth: null as null | { userId: string } };

    const token = header.slice("Bearer ".length).trim();
    try {
      const jwt = new JWTTokenService();
      const payload = await jwt.verifyAccessToken(token);
      return { auth: { userId: payload.userId } };
    } catch {
      return { auth: null as null | { userId: string } };
    }
  });
