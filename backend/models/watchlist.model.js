import mongoose, { Schema } from "mongoose";

const WatchlistSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movieId: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String,
      required: true,
    },
    movieTitle: String,
    moviePoster: String,
    movieReleaseDate: String,
    movieOverview: String,
    movieRating: Number,
    watched: {
      type: Boolean,
      default: false,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const WatchlistModel = mongoose.model(
  "Watchlist",
  WatchlistSchema,
  "watchlist"
);
export default WatchlistModel;
