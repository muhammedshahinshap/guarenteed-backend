import { NextFunction, Request, Response } from "express";
import jobhire from "../usecase/jobhire";
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const user = req.user;
    const filename = req.filename;
    const data = await jobhire({ body, user, filename });
    if (data) {
      return res.status(200).json({
        message: "success",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
