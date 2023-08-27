import { Subjects, UserMyChatReplyEvent, Publisher } from "@mspguarenteed/common";
export class MychatDataReplyPublisher extends Publisher<UserMyChatReplyEvent> {
  subject: Subjects.MychatDataReply = Subjects.MychatDataReply;
}
