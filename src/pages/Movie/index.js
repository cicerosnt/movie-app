import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';

import './style.css';

export function Movie() {
  const { id } = useParams();
  const [movies, setMovies] = useState({});
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
          setMovies(Response.data);
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
  }, [navigate, id]);

  if(loading){
    return(
      <div className='loading__container'>
        <span className='loading'></span>
        <h2>Espere um pouco... carregando lista de filmes</h2>
      </div>
    );
  }
  
  function saveFavority(){
    const movieList = localStorage.getItem("@movieapp");
    
    let movieSave = (JSON.parse(movieList) || []);
    
    const hasMovie = movieSave.some((movieSelected) => movieSelected.id === movies.id)
        
    if(hasMovie){
      toast.warn("Esse filme já esta favoritado!");
      return;
    }
    
    movieSave.push(movies);
    
    if(!localStorage.setItem("@movieapp", JSON.stringify(movieSave))){
      toast.success("Filme favoritado com sucesso!");
    }else{
      toast.warn("Erro ao Favoritar o Filme, tente novamente!");
    }
    
  }

  return (
    <div className="movie__container">
      <div className="movie__card">
        <img src={`https://image.tmdb.org/t/p/original/${movies.backdrop_path}`} alt={movies.title} />
        <h1>{movies.title}</h1>
        <p className="movie__sinopse">
          {movies.overview}
        </p>
        
        <p className="vote_average">
          <strong>Avaliação: </strong>
          {movies.vote_average} 
          / 10
        </p>
        
        <div className="movie__buttons">
          <Link to="../" className='btn'>
            <svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="homeAltIconTitle">
              <title id="homeAltIconTitle">Home</title>
              <path d="M3 10.182V22h18V10.182L12 2z"></path>
              <rect width="6" height="8" x="9" y="14"></rect>
            </svg>
            </Link>
          <Link className='btn btn_favorite' onClick={saveFavority} to="" >
            <svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="starIconTitle">
              <title id="starIconTitle">Star</title>
              <polygon points="12 17.844 6.183 20.902 7.294 14.425 2.588 9.838 9.092 8.893 12 3 14.908 8.893 21.412 9.838 16.706 14.425 17.817 20.902"></polygon>
            </svg>
          </Link>
          
          <a 
            href={`https://www.youtube.com/results?search_query=${movies.title} | treiler`} 
            target="blank" 
            rel="external"
            className='btn external'
          >
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-labelledby="eyeIconTitle">
                    <title id="eyeIconTitle">Visible (eye)</title>
                    <path d="M22 12C22 12 19 18 12 18C5 18 2 12 2 12C2 12 5 6 12 6C19 6 22 12 22 12Z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
