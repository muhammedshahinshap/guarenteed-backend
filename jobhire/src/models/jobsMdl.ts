import mongoose, { Types } from "mongoose";
import Jobs, { jobsModel, jobsDoc } from "../interfaces/jobs";
const ObjectId = Types.ObjectId;
const jobs = new mongoose.Schema(
  {
    fk_id: { type: ObjectId },
    type: { type: String },
    noOfYears: { type: String },
    tech: { type: String },
    salary: { type: String },
    discription: { type: String },
    image: { type: String },
    status: { type: Boolean, default: true },
    reportStatus: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc: Jobs, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

jobs.statics.build = (attrs: Jobs) => {
  return new Jobs(attrs);
};
const Jobs = mongoose.model<jobsDoc, jobsModel>("jobs", jobs);
export default Jobs;
