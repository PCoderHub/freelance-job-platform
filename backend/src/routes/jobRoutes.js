const express = require("express");
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");
const authMiddleware = require("../middleware/authMiddleware");
const validateRole = require("../middleware/validateRole");
const router = express.Router();

router.post("/", authMiddleware, validateRole("client"), createJob); //create job, client only
router.get("/", getAllJobs); //get all jobs
router.get("/:id", authMiddleware, getJobById); //get job by id
router.put("/:id", authMiddleware, validateRole("client"), updateJob); //update job by id, client only
router.delete(
  "/:id",
  authMiddleware,
  validateRole("admin", "client"),
  deleteJob
); //delete job by id, client, admin only
//router.post("/:id/apply");  //apply to job by id, freelancer only
//router.get("/:id/proposals");       //get proposals for job by id, client only
//router.put("/:id/assign");  //assign freelancer to job by id, client only

module.exports = router;
