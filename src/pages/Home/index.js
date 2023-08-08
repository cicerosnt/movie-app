import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import './style.css';

export function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovie() {
      const response = await api.get('/movie/now_playing', {
        params: {
          api_key: '446bd033d32843eecea2bd35230d4adb',
          laguage: 'pt-BR',
          page: 1,
        },
      });

      //console.log(response.data.results.slice(0, 10));
      const data = response.data.results.slice(0, 12);
      setMovies(data);
      setLoading(false);
    }

    loadMovie();
  }, [movies]);
  
  if(loading){
    return(
      <div className='loading'>
      <h2>Espere um pouco... carregando lista de filmes.</h2>
    </div>
    );
  }

  return (
    <div className="home__container">
      {movies.map((movie) => {
        return (
          <Link className='article' to={`/movie/${movie.id}`} key={movie.id}>
            <img
              width="100"
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt=""
              srcset=""
            />
            <div className="home__data">
              <h1>{movie.title}</h1>
              <p>{movie.genres}</p>
            </div>
          </Link>
        );
      })}
    </div>
    
  );
}
