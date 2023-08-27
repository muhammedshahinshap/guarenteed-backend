import { Subjects, JobHomeReplyEvent, Publisher } from "@mspguarenteed/common";
export class HomeJobUserReplyPublisher extends Publisher<JobHomeReplyEvent> {
  subject: Subjects.JobHomeDataReply = Subjects.JobHomeDataReply;
}
