import { NextFunction, Request, Response } from "express";
import signUpUsecase from "../useCases/signupUsecase";
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { username, password, valid } = req.body;
    const userCreate: any = await signUpUsecase({ username, password, valid });
    if (userCreate instanceof Error) throw new Error(userCreate.toString());
    if (userCreate) {
      return res.status(200).json({
        message: "Successfully Completed",
        data: [],
      });
    } else throw new Error("Try Again");
  } catch (error) {
    next(error);
  }
};
