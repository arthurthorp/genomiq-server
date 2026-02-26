import { Schema, model, Types, InferSchemaType } from "mongoose";

const NotificationSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["analysis_completed", "analysis_failed"],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
      index: true,
    },
    relatedAnalysisId: {
      type: Types.ObjectId,
      ref: "Analysis",
    },
  },
  {
    timestamps: true,
  },
);

NotificationSchema.index({ userId: 1, read: 1 });

export type NotificationDocument = InferSchemaType<typeof NotificationSchema>;
export const NotificationModel = model("Notification", NotificationSchema);
