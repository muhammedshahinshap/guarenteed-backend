import express, { NextFunction, Request, Response } from "express";
import { isAuth } from "@mspguarenteed/common";
import { companyJobs } from "../repositories/jobs";
const router = express.Router();
router.get(
  "/api/jobs/jobsdata",
  isAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let data = companyJobs(req.user._id);
      if (data)
        return res.status(200).json({
          message: "Successfully Completed",
          error: false,
          data: [data],
        });
      throw new Error("Try Again");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

export { router as jobsdata };
