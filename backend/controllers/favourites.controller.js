import FavouriteModel from "../models/favourites.model.js";

// Get user favourites
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

// Add favourite
const addFavourite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { mediaId, mediaType, mediaTitle, mediaPoster, mediaRating } =
      req.body;

    if (!mediaId || !mediaType) {
      return res.status(400).json({
        message: "mediaId and mediaType are required",
        success: false,
      });
    }

    const favourite = new FavouriteModel({
      user: userId,
      mediaId,
      mediaType,
      mediaTitle,
      mediaPoster,
      mediaRating,
    });

    await favourite.save();

    return res.status(201).json({
      message: "Added to favourites",
      success: true,
      favourite,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Already in favourites",
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
    const { mediaId } = req.params;

    if (!mediaId) {
      return res.status(400).json({
        message: "mediaId is required",
        success: false,
      });
    }

    const deleted = await FavouriteModel.findOneAndDelete({
      user: userId,
      mediaId,
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Favourite not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Removed from favourites",
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
