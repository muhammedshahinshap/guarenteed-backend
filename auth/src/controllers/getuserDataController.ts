import { NextFunction, Request, Response } from "express";
import getuserDataUseCase from "../useCases/getuserDataUsecase";
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id } = req.user;
    const userProfile = await getuserDataUseCase(_id);
    if (userProfile) {
      return res.status(200).json({
        error: false,
        messege: "Successfully Completed",
        data: [userProfile],
      });
    }
    throw new Error("Try again");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
