import { Elysia, t } from "elysia";

import { AuthController } from "./auth.controller";
import { authMiddleware } from "./auth.middleware";

import { UserRepository } from "@/shared/infrastructure/persistence/mongoose/repositories/user-repository";
import { BunV7UUIDService } from "@/shared/infrastructure/uuid/bunV7.service";

import { MongooseAuthSessionRepository } from "../infrastructure/persistence/mongoose/repositories/auth-session.repository";
import { BunHashService } from "@/shared/infrastructure/hash/bun.service";
import { JWTTokenService } from "../infrastructure/jwt/jwt-tokent.service";

import { LoginUseCase } from "../use-cases/login.usecase";

export const authRoutes = new Elysia({ prefix: "/auth" })
  .decorate(
    "authDeps",
    (() => {
      const userRepo = new UserRepository();
      const sessionRepo = new MongooseAuthSessionRepository();
      const hasher = new BunHashService();
      const tokenService = new JWTTokenService();
      const idGen = new BunV7UUIDService();

      const loginUseCase = new LoginUseCase(
        userRepo,
        sessionRepo,
        hasher,
        tokenService,
        idGen,
      );

      const controller = new AuthController(loginUseCase, userRepo);

      return { controller };
    })(),
  )

  .post(
    "/login",
    async ({ body, authDeps }) => authDeps.controller.login(body),
    {
      body: t.Object({
        email: t.String({ minLength: 3 }),
        password: t.String({ minLength: 6 }),
      }),
    },
  )
  .use(authMiddleware)
  .get("/me", async ({ auth, authDeps }) => authDeps.controller.me(auth));
