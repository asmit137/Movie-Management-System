import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    releaseDate: { type: Date, required: true },
    duration: { type: Number, required: true },
    poster: { type: String, required: true }
  },
  { timestamps: true }
);

movieSchema.index({
  title: "text",
  description: "text"
});

export default mongoose.model("Movie", movieSchema);
