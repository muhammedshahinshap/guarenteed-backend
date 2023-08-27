import User from "../models/userMdl";
import argon2 from "argon2";
import crypto from "crypto";
import { ObjectId } from "mongodb";

const getUserbyusername = async (username: string) => {
  try {
    const data = await User.findOne({ username });
    return data ? data : false;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const createUser = async ({
  username,
  password,
  status,
}: {
  username: string;
  password: string;
  status: string;
}) => {
  try {
    const userCreate = await User.create({
      username,
      password,
      currentstatus: status,
    });

    return userCreate ? userCreate : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const findValidUser = async ({ username }: { username: string }) => {
  try {
    const user = await User.findOne({
      username,
      status: true,
      currentstatus: "active",
    });
    return user ? user : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const verifyuser = async (id: ObjectId) => {
  try {
    const varify = await User.updateOne(
      {
        _id: new ObjectId(id),
        currentstatus: "pending",
        status: true,
      },
      {
        $set: {
          currentstatus: "active",
        },
      }
    );
    return varify ? varify : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const userByid = async (id: ObjectId) => {
  try {
    const userExists = await User.findById({ id });
    return userExists ? userExists : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updateUserProfile = async ({
  _id,
  u_profile,
}: {
  _id: ObjectId;
  u_profile: object;
}) => {
  try {
    const userProfile = await User.updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          role: "user",
          u_profile,
        },
      }
    );
    return userProfile ? userProfile : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const updateCompanyProfile = async ({
  _id,
  c_profile,
}: {
  _id: ObjectId;
  c_profile: object;
}) => {
  try {
    const userProfile = await User.updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          role: "company",
          c_profile,
        },
      }
    );
    return userProfile ? userProfile : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const addTowishList = async ({
  id,
  item,
}: {
  id: ObjectId;
  item: ObjectId;
}) => {
  try {
    const data = await User.updateOne(
      { _id: new ObjectId(id) },
      {
        $addToSet: {
          wishList: [{ _id: item }],
        },
      }
    );

    return data ? data : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const filterUser = async (query: object) => {
  try {
    const data = await User.find(query, { _id: 0 });
    return data ? data : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const searchuser = async ({
  username,
  name,
}: {
  username: string;
  name: string;
}) => {
  try {
    const result = await User.find({
      $or: [{ username: { $regex: name } }, { c_profile: { $regex: name } }],
      $and: [{ username: { $ne: username } }],
    }).select("-password");

    return result ? result : false;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const userChatlist = async ({
  userIdInitiative,
  userIdreciver,
  user,
}: {
  userIdInitiative: string;
  userIdreciver: string;
  user: string;
}) => {
  const data = await User.find({
    $and: [
      {
        $or: [
          {
            _id: userIdInitiative,
          },
          {
            _id: userIdreciver,
          },
        ],
      },
      { _id: { $ne: user } },
    ],
  });
  return data ? data : false;
};
const userChatlistwith = async ({
  userIdInitiative,
  userIdreciver,
}: {
  userIdInitiative: string;
  userIdreciver: string;
}) => {
  const data = await User.find({
    $and: [
      {
        $or: [
          {
            _id: userIdInitiative,
          },
          {
            _id: userIdreciver,
          },
        ],
      },
    ],
  });
  return data ? data : false;
};
export {
  getUserbyusername,
  createUser,
  findValidUser,
  verifyuser,
  userByid,
  updateUserProfile,
  updateCompanyProfile,
  addTowishList,
  filterUser,
  searchuser,
  userChatlist,
  userChatlistwith,
};
