import { ObjectId } from "mongodb";
import { mychat } from "../repositories/chat";
import { MyChatPublisher } from "../events/publishers/mychat-publisher";
import { natsWrapper } from "../config/nats-wrapper";
import { Subjects } from "@mspguarenteed/common";
import { Message } from "node-nats-streaming";

export default async ({ id, user }: { id: ObjectId; user: any }) => {
  try {
    const data: any = { user: user._id, with: false };
    data.data = mychat(id);
    await new MyChatPublisher(natsWrapper.client).publish({ data });
    const subscribe = natsWrapper.client.subscribe(
      Subjects.MychatDataReply,
      natsWrapper.client
        .subscriptionOptions()
        .setManualAckMode(true)
        .setDeliverAllAvailable()
        .setDurableName("my-chat-listener")
    );
    subscribe.on("message", (msg: Message) => {
      let data: any = msg.getData();
      data = JSON.parse(data);
      console.log(data);

      if (data) return [data];
      msg.ack();
      return;
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};
