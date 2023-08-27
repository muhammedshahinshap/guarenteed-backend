import { ObjectId } from "mongodb";
import { userByid } from "../repositories/User";

export default async (id: ObjectId) => {
  try {
    const data = await userByid(id);
    return data ? data : false;
  } catch (error) {
    console.error(error);
    return error;
  }
};
