import { createSlice } from "@reduxjs/toolkit";
import { getTopMovies, getOneMovie, getRandomMovie, loadMoreMovies, searchMovies } from "../actions/movies";

const initialState = {
  movies: [],
  preloader: false,
  randomMovie: null,
  currentMovie: null,
  error: {
    status: false,
    errorMessage: ""
  }
}

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: {
    [getTopMovies.pending]: (state, action) => {
      state.preloader = true;
      state.error.status = false;
      state.error.errorMessage = "";
    },
    [getTopMovies.fulfilled]: (state, action) => {
      state.preloader = false;
      state.error.status = false;
      state.error.errorMessage = "";
      state.movies = [...state.movies, ...action.payload.data];
    },
    [getTopMovies.rejected]: (state, action) => {
      state.preloader = false;
      state.error.status = true;
      state.error.errorMessage = "FAILED_LOAD_MOVIES";
    },
    [getOneMovie.pending]: (state, action) => {
      state.preloader = true;
      state.error.status = false;
      state.error.errorMessage = "";
    },
    [getOneMovie.fulfilled]: (state, action) => {
      state.preloader = false;
      state.error.status = false;
      state.error.errorMessage = "";
      state.currentMovie = action.payload.data;
    },
    [getOneMovie.rejected]: (state, action) => {
      state.preloader = false;
      state.error.status = true;
      state.error.errorMessage = "FAILED_LOAD_MOVIE";
    },
    [getRandomMovie.pending]: (state, action) => {
      state.preloader = true;
      state.error.status = false;
      state.error.errorMessage = "";
    },
    [getRandomMovie.fulfilled]: (state, action) => {
      state.preloader = false;
      state.error.status = false;
      state.error.errorMessage = "";
      state.randomMovie = action.payload.data;
    },
    [getRandomMovie.rejected]: (state, action) => {
      state.preloader = false;
      state.error.status = true;
      state.error.errorMessage = "FAILED_LOAD_RANDOM_MOVIE";
    },
    [loadMoreMovies.pending]: (state, action) => {
      state.preloader = true;
      state.error.status = false;
      state.error.errorMessage = "";
    },
    [loadMoreMovies.fulfilled]: (state, action) => {
      state.preloader = false;
      state.error.status = false;
      state.error.errorMessage = "";
      state.movies = [...state.movies, ...action.payload.data];
    },
    [loadMoreMovies.rejected]: (state, action) => {
      state.preloader = false;
      state.error.status = true;
      state.error.errorMessage = "FAILED_LOAD_MORE";
    },
    [searchMovies.pending]: (state, action) => {
      state.preloader = true;
      state.error.status = false;
      state.error.errorMessage = "";
    },
    [searchMovies.fulfilled]: (state, action) => {
      state.preloader = false;
      state.error.status = false;
      state.error.errorMessage = "";
      state.movies = action.payload.data;
    },
    [searchMovies.rejected]: (state, action) => {
      state.preloader = false;
      state.error.status = true;
      state.error.errorMessage = "FAILED_WHILE_SEARCH";
    },
  },
})

export default moviesSlice.reducer;