import { Schema, model, InferSchemaType } from "mongoose";

const AuthSessionSchema = new Schema(
  {
    _id: { type: String, required: true },
    userId: { type: String, required: true, index: true },
    refreshTokenHash: { type: String, required: true, index: true },
    createdAt: { type: Date, required: true, default: Date.now },
    expiresAt: { type: Date, required: true },
    revokedAt: { type: Date, default: null },
    replacedBySessionId: { type: String, default: null },
  },
  { timestamps: false },
);

AuthSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export type AuthSessionSchemaType = InferSchemaType<typeof AuthSessionSchema>;
export const AuthSessionModel = model<AuthSessionSchemaType>(
  "AuthSession",
  AuthSessionSchema,
);
