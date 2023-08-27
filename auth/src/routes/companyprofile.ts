import express from "express";
import { isAuth, requestValidationerr } from "@mspguarenteed/common";
import { body } from "express-validator";
import fileUpload from "../utils/fileUpload";
import companyController from "../controllers/companyController";
const router = express.Router();
router.get(
  "/api/users/companyprofile",
  isAuth,
  fileUpload,
  [
    body("name").trim().notEmpty().withMessage("Please Enter all Fields"),
    body("regno").trim().notEmpty().withMessage("Please Enter all Fields"),
    body("place").trim().notEmpty().withMessage("Please Enter all Fields"),
    body("address").trim().notEmpty().withMessage("Please Enter all Fields"),
    body("website").trim().notEmpty().withMessage("Please Enter all Fields"),
  ],
  requestValidationerr,
  companyController
);

export { router as companyprofile };
