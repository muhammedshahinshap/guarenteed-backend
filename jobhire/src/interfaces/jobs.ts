import mongoose, { ObjectId } from "mongoose";
export default interface Jobs {
  fk_id: ObjectId;
  type: string;
  noOfYears: string;
  tech: string;
  salary: string;
  discription: string;
  image: string;
  status: boolean;
  reportStatus: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface jobsModel extends mongoose.Model<jobsDoc> {
  build(attrs: Jobs): jobsDoc;
}

interface jobsDoc extends mongoose.Document {
  fk_id: ObjectId;
  type: string;
  noOfYears: string;
  tech: string;
  salary: string;
  discription: string;
  image: string;
  status: boolean;
  reportStatus: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export { jobsDoc, jobsModel };