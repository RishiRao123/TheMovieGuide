import express from "express";
import {
  getReviews,
  createReview,
  getUserReviews,
  deleteReview,
  updateReview,
} from "../controllers/review.controller.js";
import authMiddleware from "../middlewares/authUser.middleware.js";

const router = express.Router();

router.post("/user/review", authMiddleware, createReview);
router.get("/reviews/:movieId", getReviews);
router.get("/user/reviews", authMiddleware, getUserReviews);
router.put("/user/review/:reviewId", authMiddleware, updateReview);
router.delete("/user/review/:reviewId", authMiddleware, deleteReview);

export default router;
