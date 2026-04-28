//path: backend/src/models/Gig.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IGig extends Document {
  title: string;
  description: string;
  budget: number;
  ownerId: mongoose.Types.ObjectId;
  status: "open" | "assigned";
  category?: string;
  skills?: string[];
  deadline?: Date;
}

const GigSchema: Schema<IGig> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    budget: {
      type: Number,
      required: true,
      min: 0,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "assigned"],
      default: "open",
    },
    category: {
      type: String,
      trim: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    deadline: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Gig = mongoose.model<IGig>("Gig", GigSchema);

export default Gig;
