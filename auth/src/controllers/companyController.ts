import { NextFunction, Request, Response } from "express";
import companyProfileUsecase from "../useCases/companyProfileUsecase";
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    const body = req.body;
    // const filename = req.filename;
    const data = await companyProfileUsecase({
      user,
      body,
      //   filename,
    });
    if (data)
      return res.status(200).json({
        error: false,
        messege: "SET_LOGIN",
        data: [],
      });
    else throw new Error("Try again");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
