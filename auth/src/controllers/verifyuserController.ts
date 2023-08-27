import { NextFunction, Request, Response } from "express";
import verifyuserUSecase from "../useCases/verifyuserUSecase";
import { ObjectId } from "mongodb";
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const verify = await verifyuserUSecase(new ObjectId(req.params.id));
    if (!verify) throw new Error("Try again");
    else
      return res.status(200).json({
        message: "Successfully Completed",
        data: [],
      });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
