import express from 'express';
import { User } from '../models';
import { signToken, userAuth, serializeUser } from '../functions/auth';
import { check, validationResult } from 'express-validator';
const router = express.Router();

/**
 * @TYPE POST
 * @DESC To Register a new user
 * @ACCESS Public
 * @END_PT /api/users/register
 */
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password must contain atleast six characters').isLength({
      min: 6,
    }),
    // check("phone", "Enter a valid mobile number").isLength({ min: 10 }),
    // check("aadhar", "Enter a valid aadhar number").isLength({ min: 12 }),
    // check("category", "Category is required").not().isEmpty(),
    // check("orgName", "orgName is required").not().isEmpty(),
    // check("address", "Address is required").not().isEmpty(),
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
      return res.status(201).json({ token, success: true });
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
router.get('/auth', userAuth, async (req, res) => {
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
  '/auth',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password must contain atleast six characters').isLength({
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
          .json({ message: 'Username not found', success: false });
      }

      // Compare the password using the User Prototype Schema Method
      if (!(await user.isMatch(password, user.password))) {
        return res
          .status(403)
          .json({ message: 'Incorrect password', success: false });
      }

      // Prepare the payload for the token
      const payload = {
        username: user.username,
        email: user.email,
        id: user.id,
      };

      //to generate a token ,sign it first
      let token = await signToken(payload);
      return res.status(201).json({ token, success: true });
    } catch (err) {
      return res.status(201).json({ message: err.message, success: false });
    }
  }
);

/**
 * @TYPE PATCH
 * @DESC To add other info in user model (aadhar,bank)
 * @ACCESS Private
 * @End_PT /api/users/details
 */
router.patch(
  '/register/:id',
  userAuth,
  [
    // check('phone', 'Enter a valid mobile number').isLength({ min: 10 }),
    // check('aadhar', 'Enter a valid aadhar number').isLength({ min: 12 }),
    // check('category', 'Category is required').not().isEmpty(),
    // check('orgName', 'orgName is required').not().isEmpty(),
    // check('address', 'Address is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      aadhar,
      phone,
      phone2,
      category,
      orgName,
      address,
      accountName,
      accountNumber,
      ifsc,
    } = req.body;
    const detailFields = {};
    if (aadhar) detailFields.aadhar = aadhar;
    if (phone) detailFields.phone = phone;
    if (phone2) detailFields.phone2 = phone2;
    if (category) detailFields.category = category;
    if (orgName) detailFields.orgName = orgName;
    if (address) detailFields.address = address;
    if (accountName) detailFields.accountName = accountName;
    if (accountNumber) detailFields.accountNumber = accountNumber;
    if (ifsc) detailFields.ifsc = ifsc;

    try {
      let user = await User.findById(req.user.id);

      if (!user)
        return res.status(404).json({
          message: 'User not found',
        });

      user = await User.findByIdAndUpdate(req.user.id, { $set: detailFields });
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

export default router;
