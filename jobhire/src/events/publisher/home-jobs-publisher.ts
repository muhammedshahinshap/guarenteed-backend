import { Subjects, JobHomeEvent, Publisher } from "@mspguarenteed/common";
export class HomeJobPublisher extends Publisher<JobHomeEvent> {
  subject: Subjects.JobHomeData = Subjects.JobHomeData;
}
