import { Elysia } from "elysia";
import { HttpError } from "./http-errors";

export const httpErrorHandler = (app: Elysia) => {
  app.onError(({ code, error, set }) => {
    if (code === "VALIDATION") {
      set.status = 400;
      return { error: (error as Error).message };
    }

    if (error instanceof HttpError) {
      set.status = error.status;
      return { error: error.message };
    }

    set.status = 500;
    return { error: "Internal Server Error" };
  });
};
