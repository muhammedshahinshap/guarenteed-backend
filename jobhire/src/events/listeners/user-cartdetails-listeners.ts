import {
  Subjects,
  Listener,
  UserCartDetailsEvent,
} from "@mspguarenteed/common";
import { Message } from "node-nats-streaming";
import { usercartDetailsPublisher } from "../publisher/user-cart-publisher";
import { natsWrapper } from "../../config/natsWrapper";
import Jobs from "../../models/jobsMdl";
export class UserCartdetailsListener extends Listener<UserCartDetailsEvent> {
  subject: Subjects.userCartDetails = Subjects.userCartDetails;
  queueGroupName = "user-cart-details";
  async onMessage(
    data: UserCartDetailsEvent["data"] | any,
    msg: Message,
  ): Promise<void> {
    data = await Jobs.find({ _id: { $in: data.wishList } });
    await new usercartDetailsPublisher(natsWrapper.client).publish({ data });
    msg.ack();
  }
}
