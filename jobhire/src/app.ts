import express, { json } from "express";
import "express-async-errors";
import { gethomejob } from "./routes/getHomejob";
import { getJobdata } from "./routes/getJobdata";
import { jobdelete } from "./routes/jobDelete";
import { jobhire } from "./routes/jobhire";
import { jobsdata } from "./routes/jobsdata";
import { sendmail } from "./routes/sentMail";
import { errorhandler } from "@mspguarenteed/common";
import { NotFound } from "@mspguarenteed/common";
import dbConnection from "./config/dbConfig";
const app = express();
dbConnection();

app.use(json());
app.use(gethomejob);
app.use(getJobdata);
app.use(jobdelete);
app.use(jobhire);
app.use(jobsdata);
app.use(sendmail);

app.all("*", () => {
  throw new NotFound();
});
app.use(errorhandler);
export default app;
