import { ObjectId } from "mongodb";
import JobApplys from "../models/jobApplyMdl";
import Jobs from "../models/jobsMdl";

const jobApply = async ({ query, limit }: { query: object; limit: string }) => {
  try {
    const data = await Jobs.aggregate([
      { $match: query },
      { $limit: Number(limit) },
      { $sort: { _id: -1 } },
    ]);
    return data ? data : false;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const noOfapplication = async (id: ObjectId) => {
  try {
    const data = await JobApplys.aggregate([
      {
        $match: { userId: new ObjectId(id) },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      { $match: { month: new Date().getMonth() + 1 } },
      { $count: "total" },
    ]);
    return data ? data : false;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const findByid = async (id: ObjectId) => {
  try {
    const data = await Jobs.find({ _id: new ObjectId(id) });
    return data ? data : false;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const createJobapplication = async ({ user, data, body }: any) => {
  const job = await JobApplys.create({
    userId: user.id,
    companyId: data[0].fk_id,
    jobId: data[0]._id,
    fullname: body.fullname,
    email: body.email,
    address: body.address,
    city: body.city,
    zip: body.zip,
    contact: body.contact,
    // file: req.filename,
  });
  return job ? job : false;
};

const createJob = async ({
  type,
  noOfYears,
  tech,
  salary,
  image,
  discription,
  status,
  fk_id,
}: any) => {
  const data = await Jobs.create({
    type,
    noOfYears,
    tech,
    salary,
    image,
    discription,
    status,
    fk_id,
  });
  return data ? data : false;
};
const updateJobwithimage = async ({
  type,
  noOfYears,
  tech,
  salary,
  image,
  discription,
  status,
  id,
}: any) => {
  const data = await Jobs.updateOne(
    { _id: new ObjectId(id) },
    {
      type,
      noOfYears,
      tech,
      salary,
      discription,
      status,
    }
  );
  return data ? data : false;
};
const updateJobwithoutimage = async ({
  type,
  noOfYears,
  tech,
  salary,
  discription,
  status,
  id,
}: any) => {
  const data = await Jobs.updateOne(
    { _id: new ObjectId(id) },
    {
      type,
      noOfYears,
      tech,
      salary,
      discription,
      status,
    }
  );
  return data ? data : false;
};
const noofpost = async (id: ObjectId) => {
  const data = await Jobs.aggregate([
    {
      $match: { fk_id: new ObjectId(id) },
    },
    {
      $project: {
        month: { $month: "$createdAt" },
      },
    },
    { $match: { month: new Date().getMonth() + 1 } },
    { $count: "total" },
  ]);
  return data ? data : false;
};

const deletehire = async (id: ObjectId) => {
  const data = await Jobs.updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: {
        status: false,
      },
    }
  );
  return data ? data : false;
};

const companyJobs = async (id: ObjectId) => {
  let data = await Jobs.find({
    fk_id: new ObjectId(id),
    status: true,
    reportStatus: false,
  });
  return data ? data : false;
};

export {
  jobApply,
  noOfapplication,
  findByid,
  createJobapplication,
  createJob,
  updateJobwithoutimage,
  updateJobwithimage,
  noofpost,
  deletehire,
  companyJobs,
};
