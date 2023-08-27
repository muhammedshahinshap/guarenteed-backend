import { ObjectId } from "mongodb";
import Chat from "../models/chatMdl";
import Messages from "../models/messageMdl";
const checkChatExistence = async ({
  uid,
  id,
}: {
  uid: ObjectId;
  id: ObjectId;
}) => {
  const check = await Chat.findOne({
    $or: [
      {
        userIdInitiative: uid,
        userIdreciver: id,
      },
      {
        userIdInitiative: id,
        userIdreciver: uid,
      },
    ],
  });
  if (check) {
    return check ? check : false;
  }
};

const createChat = async ({ uid, id }: { uid: ObjectId; id: ObjectId }) => {
  const create = await Chat.create({
    userIdInitiative: uid,
    userIdreciver: id,
  });
  return create ? create : false;
};

const mychat = async (id: ObjectId) => {
  const data = await Chat.aggregate([
    {
      $match: {
        $or: [
          {
            userIdInitiative: id,
          },
          {
            userIdreciver: id,
          },
        ],
      },
    },
  ]);
  return data ? data : false;
};

const getPersonalmessages = async (id: ObjectId) => {
  const data = await Messages.aggregate([
    { $match: { $and: [{ chat: new ObjectId(id) }] } },
    {
      $lookup: {
        from: "chats",
        localField: "chat",
        foreignField: "_id",
        as: "data",
      },
    },
  ]);
  return data ? data : false;
};
export { checkChatExistence, createChat, mychat, getPersonalmessages };
