import { Request, Response, NextFunction } from "express";
import selectchatUsecase from "../usecase/selectchatUsecase";
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.body;
    const uid = req.user.id;
    const data = await selectchatUsecase({ id, uid });
    return res.status(200).json({
      messege: "SuccessFully Completed",
      data: data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
