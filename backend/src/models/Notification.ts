//path: backend/src/models/Notification.ts
import mongoose, { Document, Schema } from "mongoose";

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  message: string;
  gigId?: mongoose.Types.ObjectId;
  isRead: boolean;
}

const NotificationSchema: Schema<INotification> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    gigId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gig",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model<INotification>("Notification", NotificationSchema);
export default Notification;
