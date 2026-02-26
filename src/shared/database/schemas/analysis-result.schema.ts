import { Schema, model, Types, InferSchemaType } from "mongoose";

const MutationSchema = new Schema(
  {
    position: { type: Number, required: true },
    original: { type: String, required: true },
    mutated: { type: String, required: true },
    impact: {
      type: String,
      enum: ["low", "moderate", "high"],
      required: true,
    },
  },
  { _id: false },
);

const AnalysisResultSchema = new Schema(
  {
    analysisId: {
      type: Types.ObjectId,
      ref: "Analysis",
      required: true,
      unique: true,
      index: true,
    },
    metrics: {
      sequenceLength: Number,
      gcContent: Number,
      mutationCount: Number,
    },
    mutations: [MutationSchema],
    rawOutput: String,
  },
  {
    timestamps: true,
  },
);

export type AnalysisResultDocument = InferSchemaType<
  typeof AnalysisResultSchema
>;
export const AnalysisResultModel = model(
  "AnalysisResult",
  AnalysisResultSchema,
);
