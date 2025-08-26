import mongoose from "mongoose";
const { Schema } = mongoose;

const ReviewSchema = new Schema(
  {
    message: {
      type: String,
      required: [true, "Review message is required"],
      trim: true,
    },
    stars: {
      type: Number,
      required: [true, "Star rating is required"],
      min: 1,
      max: 5,
    },
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
  },
  {
    timestamps: true,
  }
);

const ReviewModel = mongoose.model("Review", ReviewSchema);

export default ReviewModel;
