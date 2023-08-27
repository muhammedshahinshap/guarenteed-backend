import {
  Subjects,
  UserCartDetailsEvent,
  Publisher,
} from "@mspguarenteed/common";
export class usercartDetailsPublisher extends Publisher<UserCartDetailsEvent> {
  subject: Subjects.userCartDetails = Subjects.userCartDetails;
}
