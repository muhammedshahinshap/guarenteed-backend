import mongoose, { ObjectId } from "mongoose";
export default interface message {
  sender: ObjectId; // Assuming "sender" is the ID of the user who sent the message
  content: string;
  chat: ObjectId; // Assuming "chat" is the ID of the chat the message belongs to
  createdAt?: Date;
  updatedAt?: Date;
}

interface messageModel extends mongoose.Model<messageDoc> {
  build(attrs: message): messageDoc;
}

interface messageDoc extends mongoose.Document {
  sender: ObjectId; // Assuming "sender" is the ID of the user who sent the message
  content: string;
  chat: ObjectId; // Assuming "chat" is the ID of the chat the message belongs to
  createdAt?: Date;
  updatedAt?: Date;
}

export { messageDoc, messageModel };
