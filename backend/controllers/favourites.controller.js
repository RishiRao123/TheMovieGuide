import FavouriteModel from "../models/favourites.model.js";

// Get user favourite movies
const getUserFavourites = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({
        message: "User not authenticated",
        success: false,
      });
    }

    const favourites = await FavouriteModel.find({ user: userId });

    return res.status(200).json({
      message: "Fetched user favourites successfully",
      success: true,
      favourites,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

// Post favourite
const addFavourite = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      movieId,
      mediaType,
      movieTitle,
      moviePoster,
      movieReleaseDate,
      movieOverview,
      movieRating,
    } = req.body;

    if (!movieId || !mediaType) {
      return res.status(400).json({
        message: "Movie ID and mediaType are required",
        success: false,
      });
    }

    const favourite = new FavouriteModel({
      user: userId,
      movieId,
      mediaType,
      movieTitle,
      moviePoster,
      movieReleaseDate,
      movieOverview,
      movieRating,
    });

    await favourite.save();

    return res.status(201).json({
      message: "Movie added to favourites",
      success: true,
      favourite,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Movie is already in favourites",
        success: false,
      });
    }

    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

// Delete favourite
const deleteFavourite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { movieId } = req.params;

    if (!movieId) {
      return res.status(400).json({
        message: "Movie ID is required",
        success: false,
      });
    }

    const deleted = await FavouriteModel.findOneAndDelete({
      user: userId,
      movieId: movieId,
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Favourite not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Movie removed from favourites",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export { getUserFavourites, addFavourite, deleteFavourite };
