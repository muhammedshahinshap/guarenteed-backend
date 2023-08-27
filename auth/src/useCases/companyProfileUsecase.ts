import { updateCompanyProfile, userByid } from "../repositories/User";
import { generateToken } from "../utils/generateToken";

export default async ({ body, user, filename = "fvgbhj" }: any) => {
  try {
    const id = user._id;
    let profilePicture = filename;
    const { name, address, regno, website } = body;
    if (!profilePicture) profilePicture = user.c_profile.profilePicture;
    const c_profile = {
      name,
      address,
      regno,
      website,
      profilePicture,
    };
    const userProfile = await updateCompanyProfile({ _id: id, c_profile });
    if (userProfile) {
      const userExists = await userByid(id);
      const token = generateToken(userExists);
      return {
        token: token,
        data: userExists,
      };
    }
    throw new Error("Try again");
  } catch (error) {
    console.error(error);
    return error
  }
};
