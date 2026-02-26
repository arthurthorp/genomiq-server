import { Schema, model, InferSchemaType } from "mongoose";
import { IUserDocument } from "./user.types";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.index({ email: 1 }, { unique: true });

export type UserDocument = InferSchemaType<typeof UserSchema>;
export const UserModel = model<IUserDocument>("User", UserSchema);
