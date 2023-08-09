import { Route, Routes, BrowserRouter } from 'react-router-dom';

import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Movie } from './pages/Movie';
import { Erro } from './pages/Error';
import {Favorite} from './pages/Favorite'
import { Info } from './pages/Info';

export function RoutesApp() {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/info" element={<Info />} />
          <Route path="*" element={<Erro />} />
        </Routes>
    </BrowserRouter>
  );
}
