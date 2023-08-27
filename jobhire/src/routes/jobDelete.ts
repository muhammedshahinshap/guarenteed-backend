import express, { NextFunction, Request, Response } from "express";
import { param } from "express-validator";
import { isAuth, requestValidationerr } from "@mspguarenteed/common";
import Jobs from "../models/jobsMdl";
import { ObjectId } from "mongodb";
import { deletehire } from "../repositories/jobs";
const router = express.Router();
router.get(
  "/api/jobs/deletehire/:id",
  isAuth,
  [param("id").notEmpty().withMessage("No valid params")],
  requestValidationerr,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let data = await deletehire(new ObjectId(req.params.id));
      if (data) {
        return res.status(200).json({
          message: "Successfully Completed",
          error: false,
          data: [],
        });
      }

      throw new Error("Try Again");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

export { router as jobdelete };
