import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

// HOME (pagination)
export const fetchMovies = createAsyncThunk(
  "movies/fetch",
  async (page) => {
    const res = await axios.get(`/movies?page=${page}`);
    return res.data;
  }
);

// SEARCH
export const searchMovies = createAsyncThunk(
  "movies/search",
  async (query) => {
    const res = await axios.get(`/movies/search?q=${query}`);
    return res.data;
  }
);

// SORT
export const sortMovies = createAsyncThunk(
  "movies/sort",
  async (by) => {
    const res = await axios.get(`/movies/sorted?by=${by}`);
    return res.data;
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    list: [],
    totalPages: 1
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.list = action.payload.movies;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(sortMovies.fulfilled, (state, action) => {
        state.list = action.payload;
      });
  }
});

export default movieSlice.reducer;
