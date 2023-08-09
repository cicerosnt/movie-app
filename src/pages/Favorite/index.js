import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import "./style.css";

export function Favorite() {

  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  
  useEffect(()=>{
    const listMovies = localStorage.getItem("@movieapp")
    setMovies(JSON.parse(listMovies) || []);
    console.log(movies)
  },[]);
  
  function movieRemove(id){
    let removeMovie = movies.filter((item)=> {
      return(
        item.id  !== id
      )
    });
    
    setMovies(removeMovie);
      
    if(!localStorage.setItem("@movieapp", JSON.stringify(removeMovie))){
      toast.success("Filme removido dos seus favoritos!");
    }else{
      toast.warn("Erro ao remover o fime do seus favoritos");
    }
  }

  return ( 
    <>
      <div className="container">
        <div className="headers">
          <h1>Meus favoritos</h1>
          {movies.length === 0 && <p>Você ainda não tem fimes favoritados.</p>}
        </div>
      </div>
      <div className="container">
        
        {movies.map((movie) => {
          return (
            <div>
              <Link className='article' to={`/movie/${movie.id}`} key={movie.id}>
                <img
                  width="100"
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt={movie.title}
                />
                <div className="home__data">
                  <h1>{movie.title}</h1>
                </div>
              </Link>
              
              <div className="movie__buttons">
                <Link className='btn external ' onClick={()=> movieRemove(movie.id)} to="" >
                  <svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="removeIconTitle">
                    <title id="removeIconTitle">Remove</title>
                    <path d="M17,12 L7,12"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
              
                </Link>
                <a 
                  href={`https://www.youtube.com/results?search_query=${movies.title} | treiler`} 
                  target="blank" 
                  rel="external"
                  className='btn btn_favorite'
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-labelledby="eyeIconTitle">
                    <title id="eyeIconTitle">Visible (eye)</title>
                    <path d="M22 12C22 12 19 18 12 18C5 18 2 12 2 12C2 12 5 6 12 6C19 6 22 12 22 12Z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
