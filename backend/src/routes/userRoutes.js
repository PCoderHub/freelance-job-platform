const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getMyProfile,
  updateProfile,
  changePassword,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser); //register client/freelancer
router.post("/login", loginUser); //user login
router.post("/logout", logoutUser); //user logout
router.get("/my-profile", authMiddleware, getMyProfile); //logged in user profile
router.put("/update-profile", authMiddleware, updateProfile); //update user profile
router.put("/change-password", authMiddleware, changePassword); //change user password

module.exports = router;
