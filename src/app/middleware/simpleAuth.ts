import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import config from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/use.model";
import { USER_ROLE } from "../modules/user/user.interface";

export type TUserRole = keyof typeof USER_ROLE;

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new Error("You are not authorized!");
    }

    // checking if the given token is valid
    let decoded;

    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;
    } catch (error) {
      throw new Error("UNAUTHORIZED");
    }

    const { role, id } = decoded;

    // checking if the user is exist
    const user = await User.findById(id);
    // console.log(user);

    if (!user) {
      throw new Error("This user is not found !");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new Error("UNAUTHORIZED");
    }

    req.user = decoded as JwtPayload & { role: string };
    next();
  });
};

export default auth;

// const { id } = decoded;

// const user = await User.findById(id);
// // console.log(user);

// if (!user) {
//   throw new Error("User does not exists");
// }
