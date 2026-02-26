import { Elysia } from "elysia";
import { env } from "@/shared/config/env";
import {
  connectMongo,
  disconnectMongo,
} from "@/shared/infraestructure/database/mongoose/connection";

await connectMongo();

const app = new Elysia().get("/", () => "Hello Elysia").listen(env.PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

process.on("SIGINT", async () => {
  await disconnectMongo();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await disconnectMongo();
  process.exit(0);
});
