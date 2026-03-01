import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.string().default("3000"),

  MONGO_URL: z.string().url(),
  MONGO_DB_NAME: z.string(),

  REDIS_HOST: z.string(),
  REDIS_PORT: z.string().transform(Number),

  JWT_SECRET: z.string().min(10),
  JWT_EXPIRES_IN: z.string().default("1d"),
  JWT_REFRESH_TOKEN_EXPIRES_DAYS: z.string().transform(Number).default(30),

  WORKER_CONCURRENCY: z.string().transform(Number).default(5),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  console.error(parsed.error.issues);
  process.exit(1);
}

export const env = parsed.data;
