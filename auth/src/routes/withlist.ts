import express from "express";
import { isAuth } from "@mspguarenteed/common";
import withlistController from "../controllers/withlistController";

const router = express.Router();
router.get("/api/users/withlist", isAuth, withlistController);

export { router as withlist };
