import {
  Subjects,
  UserCartDetailsReplyEvent,
  Publisher,
} from "@mspguarenteed/common";
export class usercartDetailsPublisher extends Publisher<UserCartDetailsReplyEvent> {
  subject: Subjects.userCartReplay = Subjects.userCartReplay;
}
