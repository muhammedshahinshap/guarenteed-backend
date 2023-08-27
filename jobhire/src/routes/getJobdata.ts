import express, { NextFunction, Request, Response } from "express";
import { param } from "express-validator";
import { isAuth, requestValidationerr } from "@mspguarenteed/common";
import Jobs from "../models/jobsMdl";
import { findByid } from "../repositories/jobs";
import { ObjectId } from "mongodb";
const router = express.Router();
router.post(
  "/api/jobs/getjobdata/:id",
  isAuth,
  [param("id").notEmpty().withMessage("No valid params")],
  requestValidationerr,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await findByid(new ObjectId(req.params.id));
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
  }
);

export { router as getJobdata };
