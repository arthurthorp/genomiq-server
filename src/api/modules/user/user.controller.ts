import type { Context } from "elysia";
import { CreateUserUseCase } from "./use-cases/create-user";
import { UserRepository } from "@/shared/infraestructure/database/mongoose/repositories/user-repository";
import { BunHashService } from "@/shared/infraestructure/services/hash/bun.service";
import { CreateUserDTO } from "./dto/create-user.dto";

const userRepo = new UserRepository();
const hashService = new BunHashService();
const createUserUseCase = new CreateUserUseCase(userRepo, hashService);

export const UserController = {
  async create(ctx: Context<{ body: CreateUserDTO }>) {
    const input = ctx.body;

    const user = await createUserUseCase.execute(input);
    return { status: 201, body: user };
  },
};
