import { Subjects, UserMyChatEvent, Publisher } from "@mspguarenteed/common";
export class MyChatPublisher extends Publisher<UserMyChatEvent> {
  subject: Subjects.MychatData = Subjects.MychatData;
}
