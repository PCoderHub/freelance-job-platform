const express = require("express");
const {
  getAllFreelancers,
  getFreelancerById,
  updateFreelancerProfile,
  getFreelancerJobs,
  getFreelancerProposals,
  acceptOffer,
  declineOffer,
} = require("../controllers/freelancerController");
const authMiddleware = require("../middleware/authMiddleware");
const validateRole = require("../middleware/validateRole");
const router = express.Router();

router.get(
  "/",
  authMiddleware,
  validateRole("admin", "client"),
  getAllFreelancers
); //get all freelnacers for client/admin
router.put(
  "/update-profile",
  authMiddleware,
  validateRole("freelancer"),
  updateFreelancerProfile
); //update freelancer profile
router.get(
  "/my-jobs",
  authMiddleware,
  validateRole("freelancer"),
  getFreelancerJobs
); //get freelancer jobs applied to or hired for
router.get(
  "/my-proposals",
  authMiddleware,
  validateRole("freelancer"),
  getFreelancerProposals
); //get proposals submitted by freelancer
router.get("/:id", getFreelancerById); //get freelancer by id
router.put(
  "/proposal/:id/accept",
  authMiddleware,
  validateRole("freelancer"),
  acceptOffer
);
router.put(
  "/proposal/:id/decline",
  authMiddleware,
  validateRole("freelancer"),
  declineOffer
);

module.exports = router;
