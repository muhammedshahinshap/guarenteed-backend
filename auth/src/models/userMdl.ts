import mongoose, { Types } from "mongoose";
import UserInterface, { userModel, userDoc } from "../interfaces/userinterface";
const ObjectId = Types.ObjectId;
const user = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String },
    forgetPassword: { type: String },
    premium: { type: Boolean, default: false },
    wishList: [{ _id: { type: ObjectId } }],
    c_profile: {
      name: { type: String },
      address: { type: String },
      regno: { type: String },
      website: { type: String },
      profilePicture: {
        type: String,
      },
    },
    u_profile: {
      name: { type: String },
      gender: { type: String },
      address: { type: String },
      place: { type: String },
      domain: { type: String },
      experience: { type: String },
      contact: { type: String },
      profilePicture: {
        type: String,
      },
    },
    currentstatus: { type: String },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc: UserInterface, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

user.statics.build = (attrs: UserInterface) => {
  return new User(attrs);
};
const User = mongoose.model<userDoc, userModel>("users", user);
export default User;
