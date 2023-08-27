import { updateUserProfile, userByid } from "../repositories/User";
import { generateToken } from "../utils/generateToken";
export default async ({ user, filename='sdfsfd', body }: any) => {
  try {
    const { _id } = user;
    let profilePicture = filename;
    const { name, gender, address, place, domain, experience, contact }: any =
      body;
    // if (!profilePicture) profilePicture = req.user.u_profile.profilePicture;
    const u_profile = {
      name,
      gender,
      address,
      place,
      domain,
      experience,
      contact,
      profilePicture,
    };
    const userProfile = await updateUserProfile({ _id, u_profile });
    if (userProfile) {
      const userExists = await userByid(_id);
      const token = generateToken(userExists);
      return {
        token: token,
        data: userExists,
      };
    }
    throw new Error("Try again");
  } catch (error) {
    console.log(error);
    return error;
  }
};
