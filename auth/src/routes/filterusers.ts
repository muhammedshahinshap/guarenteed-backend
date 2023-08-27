import express, { NextFunction, Request, Response } from "express";
import { isAuth, requestValidationerr } from "@mspguarenteed/common";
import { body } from "express-validator";
import User from "../models/userMdl";
import filteruserController from "../controllers/filteruserController";
const router = express.Router();
router.get(
  "/api/users/userprofile",
  isAuth,
  [
    body("year").trim().notEmpty().withMessage("Please Enter all Fields"),
    body("tech").trim().notEmpty().withMessage("Please Enter all Fields"),
  ],
  requestValidationerr,
  filteruserController
);

export { router as userprofile };
