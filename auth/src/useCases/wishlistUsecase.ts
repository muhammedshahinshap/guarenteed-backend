import { Subjects } from "@mspguarenteed/common";
import { natsWrapper } from "../config/nats-wrapper";
import { usercartDetailsPublisher } from "../events/publishers/user-cartdetails-publisher";
import { Message } from "node-nats-streaming";

export default async (wishList: any) => {
  await new usercartDetailsPublisher(natsWrapper.client).publish({
    wishList: wishList,
  });
  const subscribe = natsWrapper.client.subscribe(
    Subjects.userCartReplay,
    natsWrapper.client
      .subscriptionOptions()
      .setManualAckMode(true)
      .setDeliverAllAvailable()
      .setDurableName(Subjects.userCartReplay)
  );
  subscribe.on("message", (msg: Message) => {
    const data: any = msg.getData();
    parseData(data);
    msg.ack();
  });

  function parseData(data: any) {
    return JSON.parse(data);
  }

  // throw new Error("Try again");
};
