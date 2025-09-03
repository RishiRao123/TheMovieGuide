import mongoose, { Schema } from "mongoose";

const FavouriteSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mediaId: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String,
      required: true,
    },
    mediaTitle: {
      type: String,
      required: true,
    },
    mediaPoster: {
      type: String,
      required: true,
    },
    mediaRating: {
      type: Number,
      default: null,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

FavouriteSchema.index({ user: 1, mediaId: 1 }, { unique: true });

const FavouriteModel = mongoose.model("Favourite", FavouriteSchema);
export default FavouriteModel;
