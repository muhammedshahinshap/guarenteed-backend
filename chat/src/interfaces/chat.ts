import mongoose, { Types } from "mongoose";
export default interface chat {
  userIdInitiative: Types.ObjectId;
  userIdReceiver: Types.ObjectId;
  status: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface chatModel extends mongoose.Model<chatDoc> {
  build(attrs: chat): chatDoc;
}

interface chatDoc extends mongoose.Document {
  userIdInitiative: Types.ObjectId;
  userIdReceiver: Types.ObjectId;
  status: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export { chatDoc, chatModel };
