import { Subjects, UsercreatedEvents, Publisher } from "@mspguarenteed/common";
export class userCreatedPublisher extends Publisher<UsercreatedEvents> {
  subject: Subjects.userCreated = Subjects.userCreated;
}
