import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRandomMovie } from "../../../store/actions/movies";

export const RandomMovie = () => {
  const { title, ruTitle, description, bigPoster } = useSelector((state) => state.moviesReducer?.randomMovie);

  const background = {
    "background-image": url(bigPoster),
  }

  useEffect(() => {
    dispatch(getRandomMovie());
  }, []);

  return (
    <section id="random-movie" className="py-5 text-center container-fluid" style={background}>
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          <h1 className="fw-light text-light">{ruTitle}</h1>
          <h2 className="fw-light text-light">{title}</h2>
          <p className="lead text-white">{description}</p>
        </div>
      </div>
    </section> 
  )
}