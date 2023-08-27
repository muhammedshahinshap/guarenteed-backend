import { Request, Response, NextFunction } from "express";
import mychatUsecase from "../usecase/mychatUsecase";
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.user._id;
    const user = req.user;
    const data = mychatUsecase({ id, user });
    return res.status(200).json({
      message: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
