import cloudinary from "../config/cloudinary.js";
import { addToMovieQueue } from "../utils/queue.js";
import Movie from "../models/Movie.js";

export const getMovies = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const total = await Movie.countDocuments();

    const movies = await Movie.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      movies,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};


export const searchMovies = async (req, res) => {
  try {
    const query = req.query.q;

    
    const movies = await Movie.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ]
    });

    console.log("movies search found:",movies)
    res.status(200).json(movies);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export const sortMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ [req.query.by]: 1 });
    res.status(200).json(movies);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};


export const addMovie = async (req, res) => {
  try {

    let poster = req.body.poster;

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(
        req.file.path,
        { folder: "movies" }
      );
      poster = uploadResult.secure_url;
    }

    const movieData = {
      title: req.body.title,
      description: req.body.description,
      rating: req.body.rating,
      duration: req.body.duration,
      releaseDate: req.body.releaseDate,
      poster
    };

    // console.log("Movie Data to Add:", movieData);

  
    // const movie = await Movie.create(movieData);

    // 🔹 OPTION B (with queue – enable only if worker running)
    addToMovieQueue(movieData);

    res.status(201).json(movieData);
  } catch (e) {
    // console.error("ADD MOVIE ERROR:", e);
    res.status(500).json({
      message: "Failed to add movie",
      error: e.message
    });
  }
};


export const updateMovie = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.poster = `/uploads/${req.file.filename}`;
    }
   
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
 
    res.status(200).json(movie);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
};


export const deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Movie deleted" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
