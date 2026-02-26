import { Schema, model, Types, InferSchemaType } from "mongoose";

const SequenceSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      enum: ["FASTA", "FASTQ"],
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["uploaded", "processing", "analyzed", "failed"],
      default: "uploaded",
      index: true,
    },
    metadata: {
      organism: String,
      description: String,
    },
  },
  {
    timestamps: true,
  },
);

SequenceSchema.index({ userId: 1, createdAt: -1 });

export type SequenceDocument = InferSchemaType<typeof SequenceSchema>;
export const SequenceModel = model("Sequence", SequenceSchema);
