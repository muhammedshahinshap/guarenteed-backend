import { NextFunction, Request, Response } from "express";
import getHomeJobUsecase from "../usecase/getHomeJobUsecase";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { date, limit, tech } = req.body;
    const data = getHomeJobUsecase({ date, limit, tech });
    return res.status(200).json({
      message: "Successfully Completed",
      error: false,
      data: [data],
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
