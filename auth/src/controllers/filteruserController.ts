import { NextFunction, Request, Response } from "express";
import filteruseruseCase from "../useCases/filteruseruseCase";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { year, tech } = req.body;
    const data = await filteruseruseCase({ year, tech });
    if (data)
      return res.status(200).json({
        message: "Successfully Completed",
        error: false,
        data: [data],
      });

    throw new Error("Try again");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
