import { Route, Routes, BrowserRouter } from 'react-router-dom';

import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Movie } from './pages/Movie';
import { Erro } from './pages/error';

export function RoutesApp() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="*" element={<Erro />} />
      </Routes>
    </BrowserRouter>
  );
}
