import mongoose, { Schema } from "mongoose";

const FavouritesSchema = new Schema(
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
    movieTitle: {
      type: String, 
    },
    moviePoster: {
      type: String,
    },
    movieReleaseDate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

FavouritesSchema.index({ user: 1, movieId: 1 }, { unique: true });

const FavouritesModel = mongoose.model("Favourite", FavouritesSchema);

export default FavouritesModel;
