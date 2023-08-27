import mongoose from "mongoose";
import JobApply, { JobApplyDoc, JobApplyModel } from "../interfaces/jobapply";
const jobapply = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    companyId: { type: mongoose.Schema.Types.ObjectId },
    jobId: { type: mongoose.Schema.Types.ObjectId },
    fullname: { type: String },
    email: { type: String },
    address: { type: String },
    city: { type: String },
    zip: { type: String },
    contact: { type: String },
    file: { type: String },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc: JobApply, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);
jobapply.statics.build = (attrs: JobApply) => {
  return new JobApplys(attrs);
};
const JobApplys = mongoose.model<JobApplyDoc, JobApplyModel>("jobapply", jobapply);
export default JobApplys;
