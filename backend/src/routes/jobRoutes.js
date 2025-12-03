const express = require("express");
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  applyToJob,
  getJobProposals,
  //assignFreelancer,
  getFreelancerJobs,
  offerToFreelancer,
} = require("../controllers/jobController");
const authMiddleware = require("../middleware/authMiddleware");
const validateRole = require("../middleware/validateRole");
const router = express.Router();

router.post("/", authMiddleware, validateRole("client"), createJob); //create job, client only
router.get("/", getAllJobs); //get all jobs
router.get(
  "/freelancer",
  authMiddleware,
  validateRole("freelancer"),
  getFreelancerJobs
); //get all jobs for freelancer
router.get("/:id", authMiddleware, getJobById); //get job by id
router.put("/:id", authMiddleware, validateRole("client"), updateJob); //update job by id, client only
router.delete(
  "/:id",
  authMiddleware,
  validateRole("admin", "client"),
  deleteJob
); //delete job by id, client, admin only
router.post(
  "/:id/apply",
  authMiddleware,
  validateRole("freelancer"),
  applyToJob
); //apply to job by id, freelancer only
router.get(
  "/:id/proposals",
  authMiddleware,
  validateRole("client"),
  getJobProposals
); //get proposals for job by id, client only
// router.put(
//   "/:id/assign",
//   authMiddleware,
//   validateRole("client"),
//   assignFreelancer
// ); //assign freelancer to job by id, client only

router.put(
  "/:id/offer",
  authMiddleware,
  validateRole("client"),
  offerToFreelancer
);

module.exports = router;
