import { findValidUser } from "../repositories/User";
import { generateToken } from "../utils/generateToken";
import argon2 from "argon2";

export default async ({
  username,
  password,
  valid,
}: {
  username: string;
  password: string;
  valid: string;
}) => {
  try {
    const userExists: any = await findValidUser({ username });
    if (!userExists) {
      throw new Error("invalid username ");
    }
    if (await argon2.verify(userExists.password, password)) {
      const token = generateToken(userExists);
      return token;
    }
    throw new Error("invalid password ");
  } catch (error) {
    console.error(error);
    return error;
  }
};
