import express from "express";
import { Job } from "../models";
import randomize from "randomatic";
import { userAuth } from "../functions/auth";
import { check, validationResult } from "express-validator";

const router = express.Router();
/**
 * @ROUTE  GET api/jobs
 * @DESC   Get jobs posted by user
 * @ACCESS  Private
 */
router.get("/", userAuth, async (req, res) => {
  try {
    const myCustomLabels = {
      totalDocs: "jobCount",
      docs: "jobs",
      limit: "perPage",
      page: "currentPage",
      nextPage: "next",
      prevPage: "prev",
      totalPages: "pageCount",
      pagingCounter: "slNo",
      meta: "paginator",
    };

    const { page } = req.query;

    const options = {
      limit: 5,
      sort: { updatedAt: -1 },
      customLabels: myCustomLabels,
      page: page ? parseInt(page) : 1,
    };

    let jobs = await Job.paginate({ user: req.user.id }, options);
    return res.status(200).json(jobs);
  } catch (err) {
    a;
    console.error(err.message);
    return res.status(403).json({ message: err.message, success: false });
  }
});

/**
 * @ACCESS  Private
 * @DESC  Add new job
 * @ROUTE  POST api/jobs
 */
router.post(
  "/",
  userAuth,
  [
    check("name", "Name is required").not().isEmpty(),
    check("phone", "Enter a valid mobile number").isLength({ min: 10 }),
    check("standard", "class cannot not be empty").not().isEmpty(),
    check("school", "school cannot be empty").not().isEmpty(),
    check("area", "area cannot be empty").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //generate unique job id for user
    let numberRandom = randomize("0", 5, { exclude: "0" });
    var jobId = "XJ " + numberRandom;

    try {
      // Create New Job Object
      const newJobDetail = new Job({
        ...req.body,
        jobId,
        user: req.user.id,
      });
      const jobs = await newJobDetail.save();
      return res.status(201).json(jobs);
    } catch (err) {
      return res.status(403).json({ message: err.message, success: false });
    }
  }
);

export default router;
