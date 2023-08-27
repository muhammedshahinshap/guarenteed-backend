import { ObjectId } from "mongodb";
import { verifyuser } from "../repositories/User";

export default async (id: ObjectId) => {
  try {
    const verify = await verifyuser(id);
    return verify ? verify : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};
