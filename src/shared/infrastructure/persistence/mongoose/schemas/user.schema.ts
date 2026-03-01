import { Schema, model, InferSchemaType } from "mongoose";
import { IUserDocument } from "./user.types";

const UserSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
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

export type UserDocument = InferSchemaType<typeof UserSchema>;
export const UserModel = model<IUserDocument>("User", UserSchema);
