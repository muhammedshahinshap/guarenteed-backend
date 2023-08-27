import { verificationEmail } from "../utils/mailers";
import User from "../models/userMdl";
import argon2 from "argon2";
import crypto from "crypto";
import { getUserbyusername, createUser } from "../repositories/User";

const signUpUsecase = async ({
  username,
  password,
  valid,
}: {
  username: string;
  password: string;
  valid: string;
}) => {
  try {
    const userExists = await getUserbyusername(username);
    if (userExists) throw new Error("User Already Exist");
    const status = valid ? "active" : "pending";
    crypto.randomBytes(32, async (err, buf: any) => {
      password = (await argon2.hash(password, buf)).toString();
      const userCreate: any = await createUser({ username, password, status });
      !valid && verificationEmail(username, userCreate.id);
      return userCreate ? userCreate : false;
    });
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default signUpUsecase;
