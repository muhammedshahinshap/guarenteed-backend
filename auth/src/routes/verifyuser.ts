import express from "express";
import { isAuth, requestValidationerr } from "@mspguarenteed/common";
import { param } from "express-validator";
import mongoose from "mongoose";
import verifyuserController from "../controllers/verifyuserController";
const router = express.Router();
router.get(
  "/api/users/verifyuser/:id",
  isAuth,
  [
    param("id")
      .notEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("Not a valid data"),
  ],
  requestValidationerr,
  verifyuserController
);

export { router as verifyuser };
