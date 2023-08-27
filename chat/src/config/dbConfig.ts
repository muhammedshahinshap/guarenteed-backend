import { DbError } from "@mspguarenteed/common";
import mongoose from "mongoose";
import { natsWrapper } from "./nats-wrapper";
export default async () => {
  try {
    // mongoose.set("strictQuery", false);
    await mongoose.connect("mongodb://127.0.0.1:27017/chats", {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    await natsWrapper.connect(
      "test-cluster",
      Math.random().toString().substring(3, 7),
      "http://localhost:4222"
    );

    
    // mongoose.connection.on("error", console.error.bind(console, "connection error:"));
  } catch (error) {
    console.error(error);
    throw new DbError();
  }
};
