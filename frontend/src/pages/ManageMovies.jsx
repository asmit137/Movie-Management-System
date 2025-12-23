import { useEffect, useState } from "react";
import { Box, Button, Typography, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovies,
  addMovie,
  updateMovie,
  deleteMovie
} from "../features/movies/movieSlice";

import MovieGrid from "../components/movies/MovieGrid";
import MovieFormModal from "../components/movies/MovieFormModal";
import DeleteConfirm from "../components/movies/DeleteConfirm";
import Loader from "../components/Loader";

export default function ManageMovies() {
  const dispatch = useDispatch();
  const { movies, loading, actionLoading, page, pages } =
    useSelector((s) => s.movies);

  const [currentPage, setCurrentPage] = useState(1);
  const [openForm, setOpenForm] = useState(false);
  const [editMovie, setEditMovie] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [success, setSuccess] = useState("");

  const loadMovies = () => {
    dispatch(fetchMovies({ page: currentPage, limit: 10 }));
  };

  useEffect(() => {
    loadMovies();
  }, [dispatch, currentPage]);

  const handleSubmit = async (formData) => {
    if (editMovie) {
      await dispatch(updateMovie({ id: editMovie._id, data: formData }));
      setSuccess("Movie updated successfully");
    } else {
      await dispatch(addMovie(formData));
      setSuccess("Movie added successfully");
    }
    setOpenForm(false);
    setEditMovie(null);

    loadMovies();
  };

  const handleDelete = async () => {
    await dispatch(deleteMovie(deleteId));
    setDeleteId(null);
    setSuccess("Movie deleted successfully");

    loadMovies();
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Manage Movies
      </Typography>

      {success && <Alert sx={{ mb: 2 }}>{success}</Alert>}

      <Button variant="contained" onClick={() => setOpenForm(true)} sx={{ mb: 2 }}>
        Add Movie
      </Button>

      {loading ? (
        <Loader />
      ) : (
        <MovieGrid
          movies={movies}
          page={page}
          pages={pages}
          isAdmin
          onEdit={(movie) => {
            setEditMovie(movie);
            setOpenForm(true);
          }}
          onDelete={setDeleteId}
          onPageChange={setCurrentPage}
        />
      )}

      <MovieFormModal
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setEditMovie(null);
        }}
        movie={editMovie}
        loading={actionLoading}
        onSubmit={handleSubmit}
      />

      <DeleteConfirm
        open={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </Box>
  );
}
