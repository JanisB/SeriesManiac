import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from '../../../common/Rating/Rating';

export const RecommendMovieCard = ({
  id,
  image,
  ru_title,
  title,
  year,
  api_rating: rate,
}) => {
  return (
    <div className="card mb-3 w-100">
      <Link to={`/movies/${id}`}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={image} className="img-fluid rounded-start" alt="poster" />
          </div>
          <div className="col-md-8">
            <div className="card-body w-100">
              <h4 className="card-title text-dark w-25">{ru_title}</h4>
              <h5 className="card-title text-dark w-25">({title})</h5>
              <h5 className="card-text w-25 text-muted text-center">{year}</h5>
              <Rating rate={rate} id={id} className="w-25" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
