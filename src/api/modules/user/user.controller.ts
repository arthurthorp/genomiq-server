import type { Context } from "elysia";
import { CreateUserUseCase } from "./use-cases/create-user";
import { UserRepository } from "@/shared/infrastructure/persistence/mongoose/repositories/user-repository";
import { BunHashService } from "@/shared/infrastructure/hash/bun.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { BunV7UUIDService } from "@/shared/infrastructure/uuid/bunV7.service";

const userRepo = new UserRepository();
const hashService = new BunHashService();
const uuidService = new BunV7UUIDService();
const createUserUseCase = new CreateUserUseCase(
  userRepo,
  hashService,
  uuidService,
);

export const UserController = {
  async create(ctx: Context<{ body: CreateUserDTO }>) {
    const input = ctx.body;

    const user = await createUserUseCase.execute(input);
    return { status: 201, body: user };
  },
};
