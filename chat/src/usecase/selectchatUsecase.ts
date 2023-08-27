import { ObjectId } from "mongodb";
import { checkChatExistence, createChat } from "../repositories/chat";
export default async ({ uid, id }: { uid: ObjectId; id: ObjectId }) => {
  try {
    const check = await checkChatExistence({ uid, id });
    if (check) {
      return [{ id: check._id }];
    }
    const create = await createChat({ uid, id });
    if (create) return [{ id: create._id }];
  } catch (error) {
    console.error(error);
    return error;
  }
};
