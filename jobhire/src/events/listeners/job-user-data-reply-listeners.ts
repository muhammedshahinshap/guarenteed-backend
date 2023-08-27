import { Subjects, Listener, JobHomeReplyEvent } from "@mspguarenteed/common";
import { Message } from "node-nats-streaming";
import { natsWrapper } from "../../config/natsWrapper";
import Jobs from "../../models/jobsMdl";
export class JobHomeDataListener extends Listener<JobHomeReplyEvent> {
  subject: Subjects.JobHomeDataReply = Subjects.JobHomeDataReply;
  queueGroupName = "job-home-details";
  async onMessage(
    data: JobHomeReplyEvent["data"],
    msg: Message
  ): Promise<any> {
    msg.ack();
    // return data;
    console.log(data);
    
  }
}
