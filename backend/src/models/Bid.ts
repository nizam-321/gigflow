//path: backend/src/models/Bid.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IBid extends Document {
  gigId: mongoose.Types.ObjectId;
  freelancerId: mongoose.Types.ObjectId;
  message: string;
  amount: number;
  status: "pending" | "hired" | "rejected";
}

const BidSchema: Schema<IBid> = new Schema(
  {
    gigId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gig",
      required: true,
    },
    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "hired", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Bid = mongoose.model<IBid>("Bid", BidSchema);

export default Bid;
