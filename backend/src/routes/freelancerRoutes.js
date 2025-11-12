const express = require("express");
const { getAllFreelancers, getFreelancerById, updateFreelancerProfile, getFreelancerJobs, getFreelancerProposals } = require("../controllers/freelancerController");
const authMiddleware = require("../middleware/authMiddleware");
const validateRole = require("../middleware/validateRole")
const router = express.Router();

router.get("/", authMiddleware, validateRole("admin", "client"), getAllFreelancers);            //get all freelnacers for client/admin
router.get("/:id", getFreelancerById);         //get freelancer by id
router.put("/update-profile", authMiddleware, validateRole("freelancer"), updateFreelancerProfile)   //update freelancer profile
router.get("/my-jobs", authMiddleware, validateRole("freelancer"), getFreelancerJobs);     //get freelancer jobs applied to or hired for
router.get("/my-proposals", authMiddleware, validateRole("freelancer"), getFreelancerProposals);   //get proposals submitted by freelancer

module.exports = router;