import express, { json } from "express";
import "express-async-errors";
import { getchatdata } from "./routes/getchatdata";
import { mychats } from "./routes/mychats";
import { selectchat } from "./routes/selectchat";

import { errorhandler } from "@mspguarenteed/common";
import { NotFound } from "@mspguarenteed/common";
import dbConnection from "./config/dbConfig";
const app = express();
dbConnection();
app.use(json());
app.use(getchatdata);
app.use(mychats);
app.use(selectchat);

app.all("*", () => {
  throw new NotFound();
});
app.use(errorhandler);
export default app;
