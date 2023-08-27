import { NextFunction, Request, Response } from "express";
import searchuserUsecase from "../useCases/searchuserUsecase";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const name = req.params.name;
    const username = req.user.username;
    const result = await searchuserUsecase({ name, username });
    if (result)
      return res.status(200).json({
        messege: "SuccessFully Completed",
        data: [result],
      });

    throw new Error("Try again");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
