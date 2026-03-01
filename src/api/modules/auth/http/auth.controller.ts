import type { LoginUseCase } from "../use-cases/login.usecase";
import type { IUserRepository } from "@/shared/domain/users/user.repository";
import { UnauthorizedError } from "@/api/modules/errors/http-errors";

export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly userRepo: IUserRepository,
  ) {}

  login = async ({ email, password }: { email: string; password: string }) => {
    return this.loginUseCase.execute({ email, password });
  };

  me = async (auth: { userId: string } | null) => {
    if (!auth) throw new UnauthorizedError("Unauthorized");

    const user = await this.userRepo.findById(auth.userId);
    if (!user) throw new UnauthorizedError("Unauthorized");

    return {
      id: user.id,
      name: user.name,
      email: user.email.value,
      createdAt: user.createdAt,
    };
  };
}
