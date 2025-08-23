import express from "express";
import { createReview, getReviews, getUserReviews} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/authUser.middleware.js";

const router = express.Router();

router.post("/reviews", authMiddleware, createReview);
router.get("/reviews/:movieId", getReviews);
router.get("/user/reviews", authMiddleware, getUserReviews); 


export default router;
