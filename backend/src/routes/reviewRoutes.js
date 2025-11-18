const express = require("express");
const {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview,
  getReviews,
} = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");
const validateRole = require("../middleware/validateRole");
const router = express.Router();

router.post(
  "/",
  authMiddleware,
  validateRole("freelancer", "client"),
  createReview
); //create review after job completion
router.get("/", authMiddleware, validateRole("admin"), getAllReviews); //get all reviews, admin only
router.put(
  "/:id",
  authMiddleware,
  validateRole("freelancer", "client"),
  updateReview
); //update review, author only
router.delete("/:id", authMiddleware, deleteReview); //delete review, author or admin
router.get("/:id", authMiddleware, getReviews); //get all reviews for freelancer/client
//router.get("/client/:id", authMiddleware);          //get all reviews for client

module.exports = router;
