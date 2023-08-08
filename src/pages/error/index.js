
import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export function Erro(){
  return(
    <div className="erro__container">
      <h1 className="erro__title">404</h1>
      <p className="erro__msg">A páginaque procura não está aqui!</p>
      <Link to="/" className='btn'> 
        Bora ver a lista de filmes...
      </Link>
    </div>
  )
}