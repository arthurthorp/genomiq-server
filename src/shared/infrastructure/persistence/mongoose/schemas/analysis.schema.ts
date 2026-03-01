import { Schema, model, Types, InferSchemaType } from "mongoose";

const AnalysisSchema = new Schema(
  {
    sequenceId: {
      type: Types.ObjectId,
      ref: "Sequence",
      required: true,
      index: true,
    },
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    jobId: {
      type: String,
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["queued", "processing", "completed", "failed"],
      default: "queued",
      index: true,
    },
    parameters: {
      detectMutations: { type: Boolean, default: true },
      calculateGC: { type: Boolean, default: true },
      referenceGenome: String,
    },
    startedAt: Date,
    finishedAt: Date,
    error: String,
  },
  {
    timestamps: true,
  },
);

AnalysisSchema.index({ status: 1, createdAt: -1 });
AnalysisSchema.index({ sequenceId: 1, status: 1 });

export type AnalysisDocument = InferSchemaType<typeof AnalysisSchema>;
export const AnalysisModel = model("Analysis", AnalysisSchema);
