import express, { NextFunction, Request, Response } from "express";
import { isAuth } from "@mspguarenteed/common";
import { userByid } from "../repositories/User";
const router = express.Router();
router.get(
  "/api/users/getuserdata",
  isAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id } = req.user;
      const userProfile = await userByid(_id);
      if (userProfile) {
        return res.status(200).json({
          error: false,
          messege: "Successfully Completed",
          data: [userProfile],
        });
      }
      throw new Error("Try again");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

export { router as getuserdata };
