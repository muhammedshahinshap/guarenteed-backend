import { ObjectId } from "mongodb";
import { getPersonalmessages } from "../repositories/chat";
import { MyChatPublisher } from "../events/publishers/mychat-publisher";
import { natsWrapper } from "../config/nats-wrapper";
import { Subjects } from "@mspguarenteed/common";
import { Message } from "node-nats-streaming";

export default async ({ user, id }: any) => {
  try {
    const data: any = { user: user._id, with: true };
    data.data = await getPersonalmessages(new ObjectId(id));
    await new MyChatPublisher(natsWrapper.client).publish({ data });
    const subscribe = natsWrapper.client.subscribe(
      Subjects.MessageDataUser,
      natsWrapper.client
        .subscriptionOptions()
        .setManualAckMode(true)
        .setDeliverAllAvailable()
        .setDurableName("user-msg-data-single")
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
