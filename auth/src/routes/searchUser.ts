import express from "express";
import { isAuth, requestValidationerr } from "@mspguarenteed/common";
import { param } from "express-validator";
import mongoose from "mongoose";
import searchUserController from "../controllers/searchUserController";
const router = express.Router();
router.get(
  "/api/users/searchuser/:name",
  isAuth,
  [
    param("name")
      .trim()
      .notEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("Please Enter all Fields"),
  ],
  requestValidationerr,
  searchUserController
);

export { router as searchUser };
