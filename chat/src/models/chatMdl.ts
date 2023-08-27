import mongoose, { Types } from "mongoose";
import chats, { chatModel, chatDoc } from "../interfaces/chat";
const ObjectId = Types.ObjectId;
const chat = new mongoose.Schema(
  {
    userIdInitiative: { type: ObjectId, ref: "users" },
    userIdreciver: { type: ObjectId, ref: "users" },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    transform(doc: chats, ret: any) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  }
);

chat.statics.build = (attrs: chats) => {
  return new Chat(attrs);
};
const Chat = mongoose.model<chatDoc, chatModel>("chat", chat);
export default Chat;
