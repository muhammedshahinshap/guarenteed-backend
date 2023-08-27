import { DbError } from "@mspguarenteed/common";
import mongoose from "mongoose";
import { natsWrapper } from "./nats-wrapper";
import { JobPosterListener } from "../events/listeners/job-poster-listener";
import { JobHomeListener } from "../events/listeners/home-job-user-data";
import { ChatUserListener } from "../events/listeners/my-chat-listener";

export default async () => {
  try {
    // mongoose.set("strictQuery", false);
    await mongoose.connect("mongodb://127.0.0.1:27017/auth", {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    await natsWrapper.connect(
      "test-cluster",
      Math.random().toString().substring(3, 7),
      "http://localhost:4222"
    );
    new JobPosterListener(natsWrapper.client).listen();
    new JobHomeListener(natsWrapper.client).listen();
    new ChatUserListener(natsWrapper.client).listen();

    // mongoose.connection.on("error", console.error.bind(console, "connection error:"));
  } catch (error) {
    console.error(error);
    throw new DbError();
  }
};
