import ReviewModel from "../models/review.model.js";

// Post a review
const createReview = async (req, res) => {
  try {
    const { message, stars, movieId } = req.body;

    if (!message || !stars) {
      return res.status(400).json({
        message: "Rating and review message are required",
        success: false,
      });
    }

    if (stars < 1 || stars > 5) {
      return res.status(400).json({
        message: "Stars rating must be between 1 and 5",
        success: false,
      });
    }

    const reviewModel = new ReviewModel({
      message,
      stars,
      movieId,
      user: req.user.id,
    });

    await reviewModel.save();

    res.status(201).json({
      message: "Review created successfully",
      success: true,
      data: reviewModel,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

// Get reviews
const getReviews = async (req, res) => {
  try {
    const { movieId } = req.params;

    const reviews = await ReviewModel.find({ movieId }).populate(
      "user",
      "username profileImage"
    );

    res.status(200).json({
      message: "Reviews fetched successfully",
      success: true,
      reviews: reviews,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

const getUserReviews = async (req, res) => {
  try {
    const reviews = await ReviewModel.find({ user: req.user.id }).populate(
      "movieId"
    );

    res.status(200).json({
      message: "User reviews fetched successfully",
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export { createReview, getReviews, getUserReviews };
