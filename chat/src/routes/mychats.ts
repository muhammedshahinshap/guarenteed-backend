import express, { NextFunction, Request, Response } from "express";
import { isAuth } from "@mspguarenteed/common";
import mychatController from "../controllers/mychatController";
const router = express.Router();
router.get("/api/chat/mychats", isAuth, mychatController);

export { router as mychats };
