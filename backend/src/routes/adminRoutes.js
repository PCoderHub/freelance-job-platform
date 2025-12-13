const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const validateRole = require("../middleware/validateRole");
const {
  getDashboardStats,
  getAllUsers,
  getAllJobs,
  updateUserStatus,
  deleteUser,
  deleteJob,
} = require("../controllers/adminController");

router.get(
  "/dashboard-stats",
  authMiddleware,
  validateRole("admin"),
  getDashboardStats
);
router.get("/users", authMiddleware, validateRole("admin"), getAllUsers);
router.get("/jobs", authMiddleware, validateRole("admin"), getAllJobs);
//router.get("/payments", authMiddleware, validateRole("admin"))
router.put(
  "/users/:id/status",
  authMiddleware,
  validateRole("admin"),
  updateUserStatus
);
router.delete("/users/:id", authMiddleware, validateRole("admin"), deleteUser);
router.delete("/jobs/:id", authMiddleware, validateRole("admin"), deleteJob);

module.exports = router;
