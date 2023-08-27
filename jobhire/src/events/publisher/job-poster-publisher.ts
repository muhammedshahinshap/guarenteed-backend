import { Subjects, JobPosterEvents, Publisher } from "@mspguarenteed/common";
export class jobPosterPublisher extends Publisher<JobPosterEvents> {
  subject: Subjects.jobPosterData = Subjects.jobPosterData;
}
