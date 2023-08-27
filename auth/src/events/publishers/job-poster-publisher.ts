import { Subjects, JobPosterReplyEvent, Publisher } from "@mspguarenteed/common";
export class JobPosterPublisher extends Publisher<JobPosterReplyEvent> {
  subject: Subjects.jobPosterDataReply = Subjects.jobPosterDataReply;
}
