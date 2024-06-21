const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  genre: { type: String, required: true },
  watchStatus: { type: Boolean, default: false },
  rating: { type: Number, min: 0, max: 5 },
  reviews: { type: String },
});

const MovieModel = mongoose.model("movies", MovieSchema);

module.exports = {
  MovieModel,
};
