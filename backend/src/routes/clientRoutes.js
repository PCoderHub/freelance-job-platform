const express = require("express");
const {
  getAllClients,
  getClientById,
  updateClientProfile,
  getClientJobs,
  getClientHires,
  getDashboardStats,
} = require("../controllers/clientController");
const authMiddleware = require("../middleware/authMiddleware");
const validateRole = require("../middleware/validateRole");
const router = express.Router();

router.get(
  "/dashboard-stats",
  authMiddleware,
  validateRole("client"),
  getDashboardStats
);
router.get("/", authMiddleware, validateRole("admin"), getAllClients); //get all clients for admin
router.put(
  "/update-profile",
  authMiddleware,
  validateRole("client"),
  updateClientProfile
); //update client profile
router.get("/my-jobs", authMiddleware, validateRole("client"), getClientJobs); //get jobs posted by client
router.get("/my-hires", authMiddleware, validateRole("client"), getClientHires); //get freelancers hired by client
router.get("/:id", getClientById); //get client by id

module.exports = router;
