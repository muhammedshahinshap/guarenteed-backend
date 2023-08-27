import {
  createJob,
  noofpost,
  updateJobwithimage,
  updateJobwithoutimage,
} from "../repositories/jobs";
export default async ({ body, user, filename }: any) => {
  try {
    let validator = true;
    let image = filename;
    const { type, noOfYears, tech, salary, discription, status, id } = body;
    const fk_id = user._id;
    if (!user.premium && !id) {
      const noOfpost: any = await noofpost(user._id);
      const { total } = noOfpost?.[0] ?? [];
      validator = total >= 5 ? false : true;
    }

    let data;
    if (validator) {
      !id
        ? (data = await createJob({
            type,
            noOfYears,
            tech,
            salary,
            image,
            discription,
            status,
            fk_id,
          }))
        : image
        ? (data = await updateJobwithimage({
            type,
            noOfYears,
            tech,
            salary,
            image,
            discription,
            status,
            id,
          }))
        : (data = await updateJobwithoutimage({
            type,
            noOfYears,
            tech,
            salary,
            discription,
            status,
            id,
          }));
      if (data) {
        return true;
      } else {
        throw new Error("Try Again");
      }
    } else {
      throw new Error("Plan Exhausted Upgrade to Premium");
    }
  } catch (error) {
    console.error(error);
    return error;
  }
};
