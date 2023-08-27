import express, { NextFunction, Request, Response } from "express";
import path from "path";
import { body } from "express-validator";
import { Subjects, isAuth, requestValidationerr } from "@mspguarenteed/common";
import Jobs from "../models/jobsMdl";
import { ObjectId } from "mongodb";
import JobApplys from "../models/jobApplyMdl";
import cvUpload from "../utils/cvUpload";
import nodemailer from "nodemailer";
import { jobPosterPublisher } from "../events/publisher/job-poster-publisher";
import { natsWrapper } from "../config/natsWrapper";
import sentMailController from "../controllers/sentMailController";

const router = express.Router();

router.post(
  "/api/jobs/sendmail",
  isAuth,
  // cvUpload,
  [
    body("id").notEmpty().withMessage("Please Enter all Fields"),
    body("fullname").trim().notEmpty().withMessage("Please Enter all Fields"),
    body("email").trim().isEmail().withMessage("Please Enter all Fields"),
    body("address").trim().notEmpty().withMessage("Please Enter all Fields"),
    body("city").trim().notEmpty().withMessage("Please Enter all Fields"),
    body("zip").trim().notEmpty().withMessage("Please Enter all Fields"),
    body("contact").trim().notEmpty().withMessage("Please Enter all Fields"),
  ],
  requestValidationerr,
  sentMailController
);

export { router as sendmail };
