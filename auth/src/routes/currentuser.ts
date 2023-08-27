import express, { Request, Response } from "express";
import { isAuth } from "@mspguarenteed/common";
const router = express.Router();

router.get("/api/users/currentusers", isAuth, (req: Request, res: Response) => {
  return res.status(200).json(req.user);
});

export { router as currentusers };
