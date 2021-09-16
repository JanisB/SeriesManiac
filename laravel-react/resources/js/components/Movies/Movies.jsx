import React, { useEffect, useState } from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTopMovies,
  loadMoreMovies,
  searchMovies,
} from '../../store/actions/movies';
import { MovieListItem } from './MovieListItem/MovieListItem';
import Header from '../Header/Header';
import Spinner from 'react-bootstrap/Spinner';
import { RandomMovie } from './RandomMovie/RandomMovie';
import { toast } from 'react-toastify';
import './movies.css';

const MINIMUM_QUERY_LENGTH_FOR_SEARCH = 0;

export const Movies = () => {
  const dispatch = useDispatch();
  const { movies: topMovies } = useSelector((state) => state.moviesReducer);
  const { preloader, error } = useSelector((state) => state.moviesReducer);
  const [paginateCounter, setPaginateCounter] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState(null);

  useEffect(() => {
    if (!topMovies.length) {
      dispatch(getTopMovies(paginateCounter));
    }
  }, []);

  useEffect(() => {
    if (error.status) {
      toast.error(error.errorMessage);
    }
  }, [error.status]);

  const loadMore = () => {
    dispatch(
      loadMoreMovies({ counter: paginateCounter + 1, query: searchQuery }),
    );
    setPaginateCounter(paginateCounter + 1);
  };

  const handlerSearch = (e) => {
    e.preventDefault();

    if (
      searchText.trim()?.length > MINIMUM_QUERY_LENGTH_FOR_SEARCH &&
      searchText.trim() !== searchQuery
    ) {
      dispatch(searchMovies({ query: searchText.trim(), counter: 0 }));
      setSearchQuery(searchText.trim());
    } else if (!searchText.trim()?.length) {
      setSearchText('');
      setSearchQuery(null);
    }
  };

  return (
    <div className="content">
      <Header />

      {/* Предлагаю пока делать основной функуионал. И.Н. */}

      <RandomMovie />
      {/* <div className="container-fluid d-flex bg-light justify-content-center p-2">
        <div className="btn-group" id="button-wrapper" srole="group" aria-label="Basic radio toggle button group">
          <input type="radio" className="btn-check" name="btnradio" id="popular" autoComplete="off" />
          <label className="btn btn-outline-dark" htmlFor="popular">Popular</label>
          <input type="radio" className="btn-check" name="btnradio" id="upcoming" autoComplete="off" />
          <label className="btn btn-outline-dark" htmlFor="upcoming">Upcoming</label>
          <input type="radio" className="btn-check" name="btnradio" id="top_rated" autoComplete="off" />
          <label className="btn btn-outline-dark" htmlFor="top_rated">Top rated</label>
        </div>
      </div> */}
      <div className="container-fluid d-flex bg-light justify-content-center">
        <form
          className="form-inline col-6 px-2 d-flex justify-content-center"
          onSubmit={handlerSearch}
        >
          <input
            className="form-control m-2 w-50"
            type="search"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="btn btn-dark m-2" type="submit">
            Search
          </button>
        </form>
      </div>
      <div className="album py-5 bg-light">
        <div className="container">
          <div id="film-container" className="row align-items-center">
            {preloader || !topMovies || !topMovies.length ? (
              <div className="d-flex justify-content-center align-items-center h-100">
                <Spinner animation="border" variant="dark" />
              </div>
            ) : (
              topMovies.map((movie) => {
                return <MovieListItem key={movie.id} {...movie} />;
              })
            )}
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center pt-4">
          <button
            onClick={loadMore}
            id="load-more"
            type="button"
            className="btn btn-lg btn-outline-success"
          >
            Load more
          </button>
        </div>
      </div>
    </div>
  );
};

export default Movies;
