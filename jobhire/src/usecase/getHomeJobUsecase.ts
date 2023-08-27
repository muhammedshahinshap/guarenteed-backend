import { Subjects } from "@mspguarenteed/common";
import { natsWrapper } from "../config/natsWrapper";
import { HomeJobPublisher } from "../events/publisher/home-jobs-publisher";
import { jobApply } from "../repositories/jobs";
import { Message } from "node-nats-streaming";

export default async ({ date, tech, limit }: any) => {
  try {
    let query;
    if (date && tech) {
      query = {
        status: true,
        reportStatus: false,
        tech: { $regex: `.*${tech}.*`, $options: "i" },
        createdAt: { $gte: new Date(date) },
      };
    } else if (date) {
      query = {
        status: true,
        reportStatus: false,
        createdAt: { $gte: new Date(date) },
      };
    } else if (tech) {
      query = {
        status: true,
        reportStatus: false,
        tech: { $regex: `.*${tech}.*`, $options: "i" },
      };
    } else query = { status: true, reportStatus: false };
    const data = await jobApply({ query, limit });
    new HomeJobPublisher(natsWrapper.client).publish({ data });
    const subscribe = natsWrapper.client.subscribe(
      Subjects.JobHomeDataReply,
      natsWrapper.client
        .subscriptionOptions()
        .setManualAckMode(true)
        .setDeliverAllAvailable()
        .setDurableName("job-home-data-reply")
    );
    subscribe.on("message", (msg: Message) => {
      let data: any = msg.getData();
      data = JSON.parse(data);
      msg.ack();
      return;
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};
