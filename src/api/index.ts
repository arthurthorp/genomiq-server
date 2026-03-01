import { Elysia } from "elysia";
import { env } from "@/shared/config/env";
import {
  connectMongo,
  disconnectMongo,
} from "@/shared/infrastructure/persistence/mongoose/connection";
import { httpErrorHandler } from "./modules/errors/global-http-handler";
import { userRoutes } from "./modules/user/user.routes";

await connectMongo();

const app = new Elysia();

httpErrorHandler(app);

app.use(userRoutes);

app.listen(env.PORT, () =>
  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
  ),
);

process.on("SIGINT", async () => {
  await disconnectMongo();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await disconnectMongo();
  process.exit(0);
});
