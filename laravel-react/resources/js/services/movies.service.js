import { HttpMethod } from '../common/constants/constants';

class Movies {
  constructor({ http }) {
    this._http = http;
  }

  getTopMovies() {
    return this._http.load('api/movies', {
      method: HttpMethod.GET
    });
  }

}

export { Movies };