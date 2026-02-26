import { Schema, model, Types, InferSchemaType } from "mongoose";

const ReportSchema = new Schema(
  {
    analysisId: {
      type: Types.ObjectId,
      ref: "Analysis",
      required: true,
      index: true,
    },
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      enum: ["pdf"],
      default: "pdf",
    },
    generatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  },
);

ReportSchema.index({ userId: 1, generatedAt: -1 });

export type ReportDocument = InferSchemaType<typeof ReportSchema>;
export const ReportModel = model("Report", ReportSchema);
