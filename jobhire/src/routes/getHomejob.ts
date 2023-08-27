import express from "express";
import { isAuth } from "@mspguarenteed/common";
import getHomejobController from "../controllers/getHomejobController";
const router = express.Router();
router.get("/api/jobs/gethomejob", isAuth, getHomejobController);

export { router as gethomejob };
