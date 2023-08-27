import { NextFunction, Request, Response } from "express";
import { addTowishList } from "../repositories/User";
import { ObjectId } from "mongodb";
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.user._id;
    const item = req.params.id;
    const Add: any = await addTowishList({ id, item: new ObjectId(item) });
    if (Add)
      return res.status(200).json({
        error: false,
        messege: "Successfully Completed",
        data: [],
      });
    throw new Error("Try again");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
