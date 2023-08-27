import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { isAuth, requestValidationerr } from "@mspguarenteed/common";
import mongoose from "mongoose";
import selectchatController from "../controllers/selectchatController";
const router = express.Router();
router.post(
  "/api/jobs/selectchat",
  isAuth,
  [
    body("id")
      .trim()
      .notEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("Please Enter all Fields"),
  ],
  requestValidationerr,
  selectchatController
);

export { router as selectchat };
