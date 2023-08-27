import express, { NextFunction, Request, Response } from "express";
import { isAuth, requestValidationerr } from "@mspguarenteed/common";
import { body } from "express-validator";
import fileUpload from "../utils/fileUpload";
import userProfileController from "../controllers/userProfileController";
const router = express.Router();
router.post(
  "/api/users/userprofile",
  isAuth,
  // fileUpload,
  [
    body("name").trim().notEmpty().withMessage("Please Enter all Fields"),
    body("gender").trim().notEmpty().withMessage("Please Enter all Fields"),
    body("place").trim().notEmpty().withMessage("Please Enter all Fields"),
    body("address").trim().notEmpty().withMessage("Please Enter all Fields"),
    body("domain").trim().notEmpty().withMessage("Please Enter all Fields"),
    body("experience").trim().notEmpty().withMessage("Please Enter all Fields"),
    body("contact").trim().notEmpty().withMessage("Please Enter all Fields"),
  ],
  requestValidationerr,
  userProfileController
);

export { router as userprofile };
