import WatchlistModel from "../models/watchlist.model.js";

// Add to watchlist
const addToWatchlist = async (req, res) => {
  try {
    const {
      movieId,
      mediaType,
      movieTitle,
      moviePoster,
      movieReleaseDate,
      movieOverview,
      movieRating,
    } = req.body;
    const userId = req.user.id;
    const exists = await WatchlistModel.findOne({ user: userId, movieId });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "Movie already in watchlist" });
    }

    const item = await WatchlistModel.create({
      user: userId,
      movieId,
      mediaType,
      movieTitle,
      moviePoster,
      movieReleaseDate,
      movieOverview,
      movieRating,
    });

    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get user watchlist
const getWatchlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const list = await WatchlistModel.find({ user: userId }).sort({
      createdAt: -1,
    });
    res.json({ success: true, data: list });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Remove from watchlist
const removeFromWatchlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { movieId } = req.params;

    const item = await WatchlistModel.findOneAndDelete({
      user: userId,
      movieId,
    });
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found in watchlist" });
    }

    res.json({ success: true, message: "Movie removed from watchlist" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Toggle watched status
const toggleWatched = async (req, res) => {
  try {
    const userId = req.user.id;
    const { movieId } = req.params;

    const item = await WatchlistModel.findOne({ user: userId, movieId });
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found in watchlist" });
    }

    item.watched = !item.watched;
    await item.save();

    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export { addToWatchlist, getWatchlist, removeFromWatchlist, toggleWatched };
