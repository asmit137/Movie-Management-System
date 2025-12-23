import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../features/movies/movieSlice";
import MovieGrid from "../components/movies/MovieGrid";
import Loader from "../components/Loader";

export default function Home() {
  const dispatch = useDispatch();
  const { movies, loading, page, pages } = useSelector(
    (s) => s.movies
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchMovies({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  if (loading) return <Loader />;

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        🎬 Movies
      </Typography>

      <MovieGrid
        movies={movies}
        page={page}
        pages={pages}
        onPageChange={setCurrentPage}
      />
    </Box>
  );
}
