import { Request, RequestHandler } from "express";
declare global {
  namespace Express {
    interface Request {
      fileOrginalname?: any;
    }
  }
}
const multer = require("multer");
const path = require("path");

const fileFilter = (req: Request, file: any, cb: any) => {
  const file_extension = file.originalname.slice(
    ((file.originalname.lastIndexOf(".") - 1) >>> 0) + 2
  );
  const array_of_allowed_files = ["doc", "pdf", "docx"];

  if (array_of_allowed_files.includes(file_extension)) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Type validation failed"));
  }
};

const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: any) {
    cb(null, path.join(__dirname, "../public/hirecv"));
  },
  filename: function (req: Request, file: any, cb: any) {
    const file_extension = file.originalname.slice(
      ((file.originalname.lastIndexOf(".") - 1) >>> 0) + 2
    );
    const uniqueSuffix = `cv-${
      Date.now() + Math.round(Math.random() * 1e9)
    }.${file_extension}`;
    req.filename = uniqueSuffix;
    req.fileOrginalname = file.originalname;
    cb(null, uniqueSuffix);
  },
});

const cvUpload = (): RequestHandler => {
  return multer({
    storage: storage,
    fileFilter,
    limits: { fileSize: 4000000 },
  }).single("file");
};
export default cvUpload;
