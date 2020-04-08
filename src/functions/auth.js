import jwt from "jsonwebtoken";
import passport from "passport";
import { User } from "../models";
import { APP_SECRET, REFRESH_TOKEN } from "../config";

export const signToken = async (payload, expiresIn = 60) => {
  let secret = expiresIn === 60 ? APP_SECRET : REFRESH_TOKEN;
  let token = jwt.sign(payload, secret, { expiresIn });
  return `Bearer ${token}`;
};

export const validateRefreshToken = async (refreshToken) => {
  try {
    let token = refreshToken.replace("Bearer ", "");
    let { id } = jwt.verify(token, REFRESH_TOKEN);
    return await User.findById(id);
  } catch (err) {
    return null;
  }
};

export const userAuth = passport.authenticate("jwt", { session: false });

export const serializeUser = ({ email, username, name }) => {
  return { email, username, name };
};
