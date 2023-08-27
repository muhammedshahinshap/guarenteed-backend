import { NextFunction, Request, Response } from "express";
import signinUsecase from "../useCases/signinUsecase";
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: any | Error = await signinUsecase(req.body);
    if (token instanceof Error) {
      throw new Error(token.toString());
    } else
      return res.status(200).json({
        messege: "SET_LOGIN",
        data: [
          {
            token: token,
          },
        ],
      });
  } catch (error) {
    next(error);
  }
};
