import { IUserRepository } from "@/shared/domain/users/user.repository";
import { Email } from "@/shared/domain/users/email.vo";
import { IUUIDService } from "@/shared/domain/ports/uuid.interface";
import { IHashService } from "@/shared/domain/ports/hash.interface";
import { ITokenService } from "../ports/token-service";
import { IAuthSessionRepository } from "../ports/auth-session.repository";
import { AuthSession } from "../domain/auth-session.entity";
import { RefreshToken } from "../domain/refresh-token.vo";
import { UnauthorizedError } from "../../errors/http-errors";
import { env } from "@/shared/config/env";

function refreshExpiresAt(): Date {
  const days = Number(env.JWT_REFRESH_TOKEN_EXPIRES_DAYS ?? "30");
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}

export class LoginUseCase {
  constructor(
    private readonly users: IUserRepository,
    private readonly sessions: IAuthSessionRepository,
    private readonly hasher: IHashService,
    private readonly tokens: ITokenService,
    private readonly uuidService: IUUIDService,
  ) {}

  async execute(input: { email: string; password: string }) {
    const email = Email.create(input.email);
    const user = await this.users.findByEmail(email);

    if (!user) throw new UnauthorizedError("Invalid credentials");

    const ok = await this.hasher.compare(
      input.password,
      user.getPassword().value,
    );

    if (!ok) throw new UnauthorizedError("Invalid credentials");

    const refresh = RefreshToken.generate();

    const session = AuthSession.create({
      id: this.uuidService.generate(),
      userId: user.id,
      refreshTokenHash: refresh.hash(),
      createdAt: new Date(),
      expiresAt: refreshExpiresAt(),
      revokedAt: null,
      replacedBySessionId: null,
    });

    await this.sessions.create(session);

    return {
      accessToken: await this.tokens.signAccessToken({ userId: user.id }),
      refreshToken: refresh.value,
    };
  }
}
