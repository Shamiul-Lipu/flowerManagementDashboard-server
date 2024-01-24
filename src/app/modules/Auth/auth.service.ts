import config from "../../config";
import { createToken } from "../../utils/authUtils";
import { User } from "../user/use.model";
import { IUser } from "../user/user.interface";
import bcrypt from "bcrypt";

const registerUser = async (payload: IUser) => {
  const result = await User.create(payload);
  const aggregatedResult = await User.aggregate([
    { $match: { username: result.username } },
    { $project: { username: 1, email: 1, role: 1 } },
  ]);
  return aggregatedResult;
};

const loginUser = async (payload: { username: string; password: string }) => {
  const user = await User.findOne({ username: payload.username });

  if (!user) {
    throw new Error("User does not Exists!");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user?.password
  );

  if (!isPasswordMatched) {
    //TODO: handlePasswordError
    throw new Error("The password does not match!");
  }

  const jwtPayload = {
    id: user._id,
    role: user.role,
    email: user.email,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  const aggregatedUser = await User.aggregate([
    { $match: { username: payload.username } },
    {
      $project: { username: 1, email: 1, role: 1 },
    },
  ]);

  return { aggregatedUser, accessToken, refreshToken };
};

export const AuthServices = { registerUser, loginUser };