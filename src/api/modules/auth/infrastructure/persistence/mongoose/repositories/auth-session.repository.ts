import { IAuthSessionRepository } from "@/api/modules/auth/ports/auth-session.repository";
import { AuthSession } from "@/api/modules/auth/domain/auth-session.entity";
import { AuthSessionModel } from "../schemas/auth-session.schema";

export class MongooseAuthSessionRepository implements IAuthSessionRepository {
  async create(session: AuthSession): Promise<void> {
    const s = session.toPrimitives();
    await AuthSessionModel.create({
      _id: s.id,
      userId: s.userId,
      refreshTokenHash: s.refreshTokenHash,
      createdAt: s.createdAt,
      expiresAt: s.expiresAt,
      revokedAt: s.revokedAt ?? null,
      replacedBySessionId: s.replacedBySessionId ?? null,
    });
  }

  async findActiveByRefreshTokenHash(
    hash: string,
  ): Promise<AuthSession | null> {
    const now = new Date();
    const doc = await AuthSessionModel.findOne({
      refreshTokenHash: hash,
      revokedAt: null,
      expiresAt: { $gt: now },
    }).lean();

    if (!doc) return null;

    return AuthSession.reconstitute({
      id: doc._id,
      userId: doc.userId,
      refreshTokenHash: doc.refreshTokenHash,
      createdAt: doc.createdAt,
      expiresAt: doc.expiresAt,
      revokedAt: doc.revokedAt ?? null,
      replacedBySessionId: doc.replacedBySessionId ?? null,
    });
  }

  async revoke(sessionId: string, replacedBySessionId?: string): Promise<void> {
    await AuthSessionModel.updateOne(
      { _id: sessionId, revokedAt: null },
      {
        revokedAt: new Date(),
        replacedBySessionId: replacedBySessionId ?? null,
      },
    );
  }
}
