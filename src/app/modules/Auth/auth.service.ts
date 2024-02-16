import config from "../../config";
import { createToken, verifyToken } from "../../utils/authUtils";
import { User } from "../user/use.model";
import { IUser, USER_ROLE } from "../user/user.interface";
import bcrypt from "bcrypt";

const registerMember = async (payload: IUser) => {
  if (payload.role !== USER_ROLE.member) {
    throw new Error("User role must be member");
  }
  const result = await User.create(payload);
  const aggregatedResult = await User.aggregate([
    { $match: { username: result.username } },
    { $project: { username: 1, email: 1, role: 1 } },
  ]);
  return aggregatedResult;
};

const createSalesmanOrManager = async (payload: IUser) => {
  if (payload.role === USER_ROLE.member) {
    throw new Error("User role must be salesman");
  }
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
    username: user.username,
    purchesPoints: user.purchesPoints,
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

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { id } = decoded;

  const user = await User.findById(id);

  if (!user) {
    throw new Error("This user is not found !");
  }

  const jwtPayload = {
    id: user._id,
    role: user.role,
    email: user.email,
    username: user.username,
    purchesPoints: user.purchesPoints,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  registerMember,
  createSalesmanOrManager,
  loginUser,
  refreshToken,
};
