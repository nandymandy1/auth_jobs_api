import express from "express";
import { User } from "../models";
import { check, validationResult } from "express-validator";
import {
  signToken,
  userAuth,
  serializeUser,
  validateRefreshToken,
} from "../functions/auth";
const router = express.Router();

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
      const payload = {
        username: newUser.username,
        email: newUser.email,
        id: newUser.id,
      };
      //to generate a token ,sign it first
      let token = await signToken(payload);
      let refreshToken = await signToken(payload, "2 days");
      return res.status(201).json({ token, refreshToken, success: true });
    } catch (err) {
      console.log(err.message);
      return res.status(403).json({ message: err.message, success: false });
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
        return res
          .status(404)
          .json({ message: "Username not found", success: false });
      }

      // Compare the password using the User Prototype Schema Method
      if (!(await user.isMatch(password, user.password))) {
        return res
          .status(403)
          .json({ message: "Incorrect password", success: false });
      }

      // Prepare the payload for the token
      const payload = {
        username: user.username,
        email: user.email,
        id: user.id,
      };

      //to generate a token ,sign it first
      let token = await signToken(payload);
      let refreshToken = await signToken(payload, "2 days");
      return res.status(201).json({ token, refreshToken, success: true });
    } catch (err) {
      return res.status(201).json({ message: err.message, success: false });
    }
  }
);

router.post("/refresh-token", async (req, res) => {
  try {
    let refreshtoken = req.headers.refreshtoken;
    if (!refreshtoken) {
      return res.json({ message: "No Refresh Token Found", success: false });
    }

    let user = await validateRefreshToken(refreshtoken);
    if (!user) {
      throw new Error("Invalid Refresh Token Attempt");
    }

    // Prepare the payload for the token
    const payload = {
      username: user.username,
      email: user.email,
      id: user.id,
    };

    //to generate a token ,sign it first
    let token = await signToken(payload);
    let refreshToken = await signToken(payload, "2 days");
    return res.status(201).json({ token, refreshToken, success: true });
  } catch (err) {
    return res.status(201).json({ message: err.message, success: false });
  }
});

export default router;
