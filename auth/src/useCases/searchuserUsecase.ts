import { ObjectId } from "mongodb";
import { searchuser, userByid } from "../repositories/User";

export default async ({
  username,
  name,
}: {
  name: string;
  username: string;
}) => {
  try {
    const data = await searchuser({ username, name });
    return data ? data : false;
  } catch (error) {
    console.error(error);
    return error;
  }
};
