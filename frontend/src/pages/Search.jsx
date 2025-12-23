import { useState } from "react";
import { Grid, TextField, Select, MenuItem, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../features/movies/movieSlice";
import MovieCard from "../components/movies/MovieCard";
import Loader from "../components/Loader";

export default function Search() {
  const dispatch = useDispatch();
  const { movies, loading } = useSelector((s) => s.movies);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const handleSearch = () => {
    dispatch(fetchMovies({ q: search, by: sort }));
  };

  if (loading) return <Loader />;

  return (
    <Box p={2}>
      {/* 🔍 SEARCH BAR */}
      <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        <TextField
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          fullWidth
        />

        <Select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          size="small"
          sx={{ minWidth: 180 }}
          displayEmpty
        >
          <MenuItem value="">Sort By</MenuItem>
          <MenuItem value="title">Name</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
          <MenuItem value="releaseDate">Release Date</MenuItem>
          <MenuItem value="duration">Duration</MenuItem>
        </Select>

        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{ whiteSpace: "nowrap" }}
        >
          Search
        </Button>
      </Box>

      {/* 🎬 RESULTS */}
      <Grid container spacing={2}>
        {movies.map((m) => (
          <Grid item xs={12} sm={6} md={3} key={m._id}>
            <MovieCard movie={m} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
