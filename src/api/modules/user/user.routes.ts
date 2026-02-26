import { Elysia } from "elysia";
import { UserController } from "./user.controller";
import { CreateUserSchema } from "./dto/create-user.dto";

export const userRoutes = new Elysia().post("/users", UserController.create, {
  body: CreateUserSchema,
});
