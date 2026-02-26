import { Document } from "mongoose";

export interface IUserDocument extends Document {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
