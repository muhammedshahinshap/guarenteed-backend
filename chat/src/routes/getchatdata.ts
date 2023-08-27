import express from "express";
import { param } from "express-validator";
import { isAuth, requestValidationerr } from "@mspguarenteed/common";
import mongoose from "mongoose";
import getChatdataController from "../controllers/getChatdataController";
const router = express.Router();
router.get(
  "/api/chat/getchatdata/:id",
  isAuth,
  [
    param("id")
      .notEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("No valid params"),
  ],
  requestValidationerr,
  getChatdataController
);

export { router as getchatdata };
