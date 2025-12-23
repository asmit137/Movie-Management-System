import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

/* ================= FETCH MOVIES (PAGINATION) ================= */
export const fetchMovies = createAsyncThunk(
  "movies/fetch",
  async ({ page = 1, limit = 10, q, by } = {}) => {
    let res;

    if (q && q.trim()) {
      // 🔍 Search
      res = await api.get("/movies/search", {
        params: { q }
      });

      return {
        movies: res.data,
        page: 1,
        pages: 1,
        total: res.data.length
      };
    }

    if (by) {
      // ↕ Sort
      res = await api.get("/movies/sorted", {
        params: { by }
      });

      return {
        movies: res.data,
        page: 1,
        pages: 1,
        total: res.data.length
      };
    }

    // 📄 Normal pagination
    res = await api.get("/movies", {
      params: { page, limit }
    });

    return res.data;
  }
);

/* ================= ADD MOVIE ================= */
export const addMovie = createAsyncThunk(
  "movies/add",
  async (data, { dispatch }) => {
    await api.post("/movies", data);
    dispatch(fetchMovies({ page: 1, limit: 10 }));
  }
);

/* ================= UPDATE MOVIE ================= */
export const updateMovie = createAsyncThunk(
  "movies/update",
  async ({ id, data }, { dispatch }) => {
    console.log("Updating movie ID:", id);
    await api.put(`/movies/${id}`, data);
    dispatch(fetchMovies({ page: 1, limit: 10 }));
  }
);

/* ================= DELETE MOVIE ================= */
export const deleteMovie = createAsyncThunk(
  "movies/delete",
  async (id, { dispatch }) => {
    await api.delete(`/movies/${id}`);
    dispatch(fetchMovies({ page: 1, limit: 10 }));
    return id;
  }
);

/* ================= SLICE ================= */
const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    page: 1,
    pages: 1,
    total: 0,
    loading: false,
    actionLoading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
   
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.movies;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
        state.total = action.payload.total;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.loading = false;
      })

     
      .addCase(addMovie.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(addMovie.fulfilled, (state) => {
        state.actionLoading = false;
      })

     
      .addCase(updateMovie.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(updateMovie.fulfilled, (state) => {
        state.actionLoading = false;
      });
  }
});

export default movieSlice.reducer;
