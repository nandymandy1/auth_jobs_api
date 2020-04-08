import Router from "express";
import { User } from "../models";
import { check, validationResult } from "express-validator";
import {
  userAuth,
  signToken,
  serializeUser,
  validateRefreshToken,
} from "../functions/auth";

const router = Router();

/**
 * @TYPE POST
 * @DESC To Register a new user
 * @ACCESS Public
 * @END_PT /api/users/register
 */
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("username", "Username is required").not().isEmpty(),
    check("password", "Password must contain atleast six characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newUser = await User.create(req.body);
      tokenResp(newUser, res);
    } catch (err) {
      return res.status(403).json({
        message: err.message,
        success: false,
      });
    }
  }
);

/**
 * @TYPE GET
 * @DESC To Get the user's profile using the auth token
 * @ACCESS Private
 * @END_PT /api/users/auth
 */
router.get("/auth", userAuth, async (req, res) => {
  let authUser = serializeUser(req.user);
  return res.status(200).json(authUser);
});

/**
 * @TYPE POST
 * @DESC To Login a User via username and password
 * @ACCESS Public
 * @END_PT /api/users/auth
 */
router.post(
  "/auth",
  [
    check("username", "Username is required").not().isEmpty(),
    check("password", "Password must contain atleast six characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    try {
      // Find the user from the database using the username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({
          message: "Username not found",
          success: false,
        });
      }
      // Compare the password using the User Prototype Schema Method
      if (!(await user.isMatch(password, user.password))) {
        return res.status(403).json({
          message: "Incorrect password",
          success: false,
        });
      }
      tokenResp(user, res);
    } catch (err) {
      return res.status(401).json({
        message: err.message,
        success: false,
      });
    }
  }
);

router.post("/refresh-token", async (req, res) => {
  try {
    let refreshtoken = req.headers.refreshtoken;
    if (!refreshtoken) {
      throw new Error("No Refresh Token Found");
    }
    let user = await validateRefreshToken(refreshtoken);
    if (!user) {
      throw new Error("Invalid Refresh Token Attempt");
    }
    tokenResp(user, res);
  } catch (err) {
    return res.status(401).json({
      message: err.message,
      success: false,
    });
  }
});

const tokenResp = async (user, res) => {
  const payload = {
    id: user.id,
    email: user.email,
    username: user.username,
  };

  //to generate a token ,sign it first
  let token = await signToken(payload);
  let refreshToken = await signToken(payload, "2 days");
  return res.status(200).json({
    token,
    refreshToken,
    success: true,
  });
};

export default router;
