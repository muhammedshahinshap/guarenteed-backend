import jwt from "jsonwebtoken";
const generateToken = (data: any) => {
  try {
    return jwt.sign({ data: data }, "4Zp:EBnn9i5(rRSk", {
      expiresIn: "3d",
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

export { generateToken };
