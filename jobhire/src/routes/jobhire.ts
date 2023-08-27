import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { isAuth, requestValidationerr } from "@mspguarenteed/common";
import fileUpload from "../utils/fileUpload";
import jobhireController from "../controllers/jobhireController";
const router = express.Router();
router.post(
  "/api/jobs/hire",
  isAuth,
  // fileUpload,
  [
    body("type").trim().notEmpty().withMessage("Please Enter all Fields"),
    body("salary").trim().notEmpty().withMessage("Please Enter all Fields"),
    body("tech").trim().notEmpty().withMessage("Please Enter all Fields"),
    body("discription")
      .trim()
      .notEmpty()
      .withMessage("Please Enter all Fields"),
    body("status").trim().notEmpty().withMessage("Please Enter all Fields"),
    body("noOfYears").trim().notEmpty().withMessage("Please Enter all Fields"),
  ],
  requestValidationerr,
  jobhireController
);

export { router as jobhire };
