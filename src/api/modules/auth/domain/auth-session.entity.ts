export type AuthSessionProps = {
  id: string;
  userId: string;
  refreshTokenHash: string;
  createdAt: Date;
  expiresAt: Date;
  revokedAt?: Date | null;
  replacedBySessionId?: string | null;
};

export class AuthSession {
  private constructor(private props: AuthSessionProps) {}

  static create(props: AuthSessionProps) {
    if (!props.id) throw new Error("AuthSession requires id");
    if (!props.userId) throw new Error("AuthSession requires userId");
    if (!props.refreshTokenHash)
      throw new Error("AuthSession requires refreshTokenHash");
    if (props.expiresAt <= props.createdAt)
      throw new Error("expiresAt must be > createdAt");
    return new AuthSession({
      ...props,
      revokedAt: props.revokedAt ?? null,
      replacedBySessionId: props.replacedBySessionId ?? null,
    });
  }

  static reconstitute(props: AuthSessionProps) {
    return new AuthSession(props);
  }

  get id() {
    return this.props.id;
  }
  get userId() {
    return this.props.userId;
  }
  get refreshTokenHash() {
    return this.props.refreshTokenHash;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get expiresAt() {
    return this.props.expiresAt;
  }
  get revokedAt() {
    return this.props.revokedAt ?? null;
  }
  get replacedBySessionId() {
    return this.props.replacedBySessionId ?? null;
  }

  isActive(now = new Date()) {
    return !this.revokedAt && this.expiresAt > now;
  }

  revoke(replacedBySessionId?: string) {
    this.props.revokedAt = new Date();
    this.props.replacedBySessionId = replacedBySessionId ?? null;
  }

  toPrimitives(): AuthSessionProps {
    return { ...this.props };
  }
}
