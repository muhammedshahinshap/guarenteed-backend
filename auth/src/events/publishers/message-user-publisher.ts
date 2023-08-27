import {
  Subjects,
  MessageDataUserEvent,
  Publisher,
} from "@mspguarenteed/common";
export class MessageDataUserPublisher extends Publisher<MessageDataUserEvent> {
  subject: Subjects.MessageDataUser = Subjects.MessageDataUser;
}
