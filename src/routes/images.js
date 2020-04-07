import express from 'express';
import { Image } from '../models';
import { userAuth } from '../functions/auth';
import multer from 'multer';
import { validationResult } from 'express-validator';

const router = express.Router();

//multere initialized
const storage = multer.diskStorage({
  destination: (req, file, done) => done(null, './uploads'),
  filename: (req, file, done) => {
    let lastIndex = file.originalname.lastIndexOf('.');
    // Get Original File Extension
    let extension = file.originalname.substring(lastIndex);
    done(
      null,
      file.fieldname +
        '-' +
        new Date().toISOString().replace(/:|\./g, '') +
        extension
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50,
  },
  fileFilter: fileFilter,
});

/**
 * @ROUTE Get api/images
 * @DESC  Get profile images ulpoaded by user
 * @ACCESS Private
 */
router.get('/', userAuth, async (req, res) => {
  //pull from db by id and sort by latest date
  try {
    const image = await Image.findOne({
      user: req.user.id,
    }).sort([['profilePicture', -1]]);
    res.json(image.profilePicture);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @ROUTE POST api/images
 * @DESC Add new image
 * @ACCESS Private
 */
router.post(
  '/',
  [userAuth, upload.single('profilePicture')],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log(req.file.filename);

    //then add it to common details model
    try {
      const newDetail = new Image({
        user: req.user.id,
        profilePicture: req.file.filename,
      });

      const image = await newDetail.save();
      res.json(image);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('server error');
    }
  }
);

//@route  PUT api/common/:id
//@desc   Update details
//@access  Private
router.put('/:id', (req, res) => {
  res.send('Update details');
});

//@route  DELETE api/common/:id
//@desc   Delete details
//@access  Private
router.delete('/:id', (req, res) => {
  res.send('Delete details');
});

export default router;
