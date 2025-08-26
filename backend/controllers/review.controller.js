import ReviewModel from "../models/review.model.js";

// Post a review
const createReview = async (req, res) => {
  try {
    const { message, stars, movieId, mediaType } = req.body;

    if (!message || !stars || !movieId || !mediaType) {
      return res.status(400).json({
        message: "Message, stars, movieId, and mediaType are required",
        success: false,
      });
    }

    if (stars < 1 || stars > 5) {
      return res.status(400).json({
        message: "Stars rating must be between 1 and 5",
        success: false,
      });
    }

    const review = new ReviewModel({
      message,
      stars,
      movieId,
      mediaType,
      user: req.user.id,
    });

    await review.save();

    res.status(201).json({
      message: "Review created successfully",
      success: true,
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

// Get reviews for a movie (by movieId + mediaType)
const getReviews = async (req, res) => {
  try {
    const { movieId, mediaType } = req.params;

    const reviews = await ReviewModel.find({ movieId, mediaType }).populate(
      "user",
      "username profileImage"
    );

    res.status(200).json({
      message: "Reviews fetched successfully",
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

// Get all reviews for a user
const getUserReviews = async (req, res) => {
  try {
    const reviews = await ReviewModel.find({ user: req.user.id });

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

// Update a review
const updateReview = async (req, res) => {
  try {
    const { message, stars } = req.body;
    const { reviewId } = req.params;

    const review = await ReviewModel.findById(reviewId);

    if (!review) {
      return res
        .status(404)
        .json({ message: "Review not found", success: false });
    }

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized to update this review",
        success: false,
      });
    }

    if (message !== undefined) review.message = message;
    if (stars !== undefined) {
      if (stars < 1 || stars > 5) {
        return res.status(400).json({
          message: "Stars rating must be between 1 and 5",
          success: false,
        });
      }
      review.stars = stars;
    }

    const updatedReview = await review.save();

    res.status(200).json({
      message: "Review updated successfully",
      success: true,
      updatedReview,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const deletedReview = await ReviewModel.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({
        message: "Review not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Review deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export { createReview, getReviews, getUserReviews, deleteReview, updateReview };
