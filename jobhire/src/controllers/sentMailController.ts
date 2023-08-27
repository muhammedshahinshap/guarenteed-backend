import { NextFunction, Request, Response } from "express";
import sentMailUsecase from "../usecase/sentMailUsecase";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const user = req.user;

    const data: any = await sentMailUsecase({ body, user });
    if (data)
      res.status(200).json({
        message: "Successfully Completed",
        data: [],
      });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
