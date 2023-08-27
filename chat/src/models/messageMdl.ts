import mongoose from "mongoose";
import Message, { messageModel, messageDoc } from "../interfaces/message";
const message = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc: Message, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);
message.statics.build = (attrs: Message) => {
  return new Messages(attrs);
};
const Messages = mongoose.model<messageDoc, messageModel>("message", message);
export default Messages;
