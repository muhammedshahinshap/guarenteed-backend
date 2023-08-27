import express from "express";
import { body } from "express-validator";
import { requestValidationerr } from "@mspguarenteed/common";
import signinController from "../controllers/signinController";
const router = express.Router();
router.post(
  "/api/users/signin",
  [
    body("username").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage("Password must have 8 character and should not exceed 20"),
  ],
  requestValidationerr,
  signinController
);

export { router as signin };
