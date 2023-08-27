import mongoose, { Types } from "mongoose";
export default interface JobApply {
  userId: Types.ObjectId;
  companyId?: Types.ObjectId;
  jobId?: Types.ObjectId;
  fullname?: string;
  email?: string;
  address?: string;
  city?: string;
  zip?: string;
  contact?: string;
  file?: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface JobApplyModel extends mongoose.Model<JobApplyDoc> {
  build(attrs: JobApply): JobApplyDoc;
}

interface JobApplyDoc extends mongoose.Document {
  userId: Types.ObjectId;
  companyId?: Types.ObjectId;
  jobId?: Types.ObjectId;
  fullname?: string;
  email?: string;
  address?: string;
  city?: string;
  zip?: string;
  contact?: string;
  file?: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export { JobApplyDoc, JobApplyModel };
