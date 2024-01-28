import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import config from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/use.model";

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // console.log(
    //   "9 simpleAuth req.headers.authorization",
    //   req.headers.authorization
    // );
    const token = req.headers.authorization;

    // Check if user sent any token or not
    if (!token) {
      throw new Error("Unauthorized Access");
    }

    let decoded;

    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;
    } catch (err) {
      throw new Error("Unauthorized Access");
    }

    const { id } = decoded;

    const user = await User.findById(id);
    // console.log(user);

    if (!user) {
      throw new Error("User does not exists");
    }

    req.user = decoded;

    next();
  });
};

export default auth;
