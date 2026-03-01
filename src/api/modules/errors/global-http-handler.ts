import type { Elysia } from "elysia";
import { HttpError } from "./http-errors";
import { env } from "@/shared/config/env";

type MaybeStatusError = Error & { status?: number };

export const httpErrorHandler = (app: Elysia) => {
  return app.onError(({ code, error, set }) => {
    if (code === "VALIDATION") {
      set.status = 400;
      return {
        error: "ValidationError",
        message: error.message,
      };
    }

    if (code === "PARSE") {
      set.status = 400;
      return {
        error: "BadRequest",
        message: "Invalid JSON body",
      };
    }

    if (code === "NOT_FOUND") {
      set.status = 404;
      return {
        error: "NotFound",
        message: "Route not found",
      };
    }

    if (error instanceof HttpError) {
      set.status = error.status;
      return {
        error: error.name,
        message: error.message,
      };
    }

    const maybe = error as MaybeStatusError;
    const status = typeof maybe.status === "number" ? maybe.status : 500;

    set.status = status;

    return {
      error: "InternalServerError",
      message: "Internal Server Error",
      details: env.NODE_ENV === "development" ? error : undefined,
    };
  });
};
