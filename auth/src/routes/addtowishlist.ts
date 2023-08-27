import express, { NextFunction, Request, Response } from "express";
import { isAuth, requestValidationerr } from "@mspguarenteed/common";
import { param } from "express-validator";
import mongoose from "mongoose";
import addtowidhlistController from "../controllers/addtowidhlistController";
const router = express.Router();
router.get(
  "/api/users/addtowithlist/:id",
  isAuth,
  [
    param("id")
      .notEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("Not a valid data"),
  ],
  requestValidationerr,
  addtowidhlistController
);

export { router as addtowishlist };
