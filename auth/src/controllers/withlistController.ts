import { NextFunction, Request, Response } from "express";
import wishlistUsecase from "../useCases/wishlistUsecase";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: any = await wishlistUsecase(req.user.wishList);
    return data ? data : false;
  } catch (error) {
    console.log(error);
    next(error);
  }
};
