import { filterUser } from "../repositories/User";

export default async ({ year, tech }: any) => {
  try {
    let query;
    if (year && tech) {
      query = {
        "u_profile.domain": { $regex: `.*${tech}.*`, $options: "i" },
        "u_profile.experience": { $regex: `${year}.*`, $options: "i" },
      };
    } else if (tech) {
      query = {
        "u_profile.domain": { $regex: `.*${tech}.*`, $options: "i" },
      };
    } else {
      query = {
        "u_profile.experience": { $regex: `${year}.*`, $options: "i" },
      };
    }
    const data = await filterUser(query);
    return data ? data : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};
