import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import api from '../../services/api';

import './style.css';

export function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadMovie() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: '446bd033d32843eecea2bd35230d4adb',
            laguage: 'pt-BR',
          },
        })
        .then((Response) => {
          setMovie(Response.data);
         setLoading(false);
        })
        .catch(() => {
          //console.log('filme não localizado');
          navigate("/", {replace: true});
          return;
        });
    }

    loadMovie();

    return () => {
      //console.log('coponente desmontado');
    };
  }, []);

  if(loading){
    return(
      <div className='loading__container'>
      <span className='loading'></span>
      <h2>Espere um pouco... carregando lista de filmes</h2>
    </div>
    );
  }

  return (
    <div className="movie__container">
      <div className="movie__card">
        <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="" srcset="" />
        <h1>{movie.title}</h1>
        <p className="movie__sinopse">
          {movie.overview}
        </p>
        
        <p className="vote_average">
          <strong>Avaliação: </strong>
          {movie.vote_average} 
          / 10
        </p>
        
        <div className="movie__buttons">
          <Link to="../" className='btn'>Voltar</Link>
          <a 
            href={`https://www.youtube.com/results?search_query=${movie.title} | treiler`} 
            target="_blank" 
            rel="external"
            className='btn external'
          >
            Ver treiler
          </a>
        </div>
      </div>
    </div>
  );
}
