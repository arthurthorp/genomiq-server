import { AuthSession } from "../domain/auth-session.entity";

export interface IAuthSessionRepository {
  create(session: AuthSession): Promise<void>;
  findActiveByRefreshTokenHash(hash: string): Promise<AuthSession | null>;
  revoke(sessionId: string, replacedBySessionId?: string): Promise<void>;
}
