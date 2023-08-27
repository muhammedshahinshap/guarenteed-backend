import { NextFunction, Request, Response } from "express";
import personalmessageuseCase from "../usecase/personalmessageuseCase";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const data = await personalmessageuseCase({ user, id });
    if (data)
      res.status(200).json({
        message: "Success",
        data: data,
      });
    throw new Error("Try again");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
