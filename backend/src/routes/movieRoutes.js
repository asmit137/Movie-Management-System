import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";
import {
  getMovies,
  searchMovies,
  sortMovies,
  addMovie,
  updateMovie,
  deleteMovie
} from "../controllers/movieController.js";

const router = express.Router();

router.get("/", getMovies);
router.get("/search", searchMovies);
router.get("/sorted", sortMovies);


router.post("/", upload.single("file"), addMovie);
router.put("/:id", authMiddleware, adminOnly , upload.single("file"), updateMovie);
router.delete("/:id", authMiddleware, adminOnly, deleteMovie);

export default router;
