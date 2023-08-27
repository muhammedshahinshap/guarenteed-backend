import { Subjects, Listener, JobHomeEvent } from "@mspguarenteed/common";
import { Message } from "node-nats-streaming";
import User from "../../models/userMdl";
import { ObjectId } from "mongodb";
import { HomeJobUserReplyPublisher } from "../publishers/home-job-user-reply-publisher";
import { natsWrapper } from "../../config/nats-wrapper";
import { userByid } from "../../repositories/User";
export class JobHomeListener extends Listener<JobHomeEvent> {
  subject: Subjects.JobHomeData = Subjects.JobHomeData;
  queueGroupName = "job-home-queue";
  async onMessage(
    data: JobHomeEvent["data"],
    msg: Message,
    replyTo: any
  ): Promise<void> {
    data.data = await Promise.all(
      data?.data.map(async (item: any) => {
        return {
          ...item,
          data: await userByid(item.fk_id),
        };
      })
    );
    new HomeJobUserReplyPublisher(natsWrapper.client).publish({ data });
    msg.ack();
  }
}
