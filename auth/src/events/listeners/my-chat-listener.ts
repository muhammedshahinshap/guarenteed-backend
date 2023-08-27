import { Subjects, Listener, UserMyChatEvent } from "@mspguarenteed/common";
import { Message } from "node-nats-streaming";
import { natsWrapper } from "../../config/nats-wrapper";
import { MychatDataReplyPublisher } from "../publishers/my-chat-replay-publisher";
import { MessageDataUserPublisher } from "../publishers/message-user-publisher";
import { userChatlist,userChatlistwith } from "../../repositories/User";
export class ChatUserListener extends Listener<UserMyChatEvent> {
  subject: Subjects.MychatData = Subjects.MychatData;
  queueGroupName = "my-chat-data-listener";
  async onMessage(
    data: UserMyChatEvent["data"],
    msg: Message,
    replyTo: any
  ): Promise<void> {
    console.log(data);
    !data.data.with
      ? (data.data.data = await Promise.all(
          data?.data.data.map(async (item: any) => {
            return {
              ...item,
              datas: await  userChatlist({ userIdInitiative:item.userIdInitiative,userIdreciver:item.userIdreciver,user:data.data.user}),
            };
          })
        ))
      : (data.data.data = await Promise.all(
          data?.data.data.map(async (item: any) => {
            return {
              ...item,
              datas: await  userChatlistwith({ userIdInitiative:item.userIdInitiative,userIdreciver:item.userIdreciver}),
           
            };
          })
        ));
    if (!data.data.with) {
      new MychatDataReplyPublisher(natsWrapper.client).publish({ data });
    } else {
      new MessageDataUserPublisher(natsWrapper.client).publish({ data });
    }
    msg.ack();
  }
}
