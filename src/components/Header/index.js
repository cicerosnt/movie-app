import { Link } from 'react-router-dom';

import './style.css';

export function Header() {
  return (
    <header>
      <nav>
        <Link className="logo" to="/">
          Movie App
        </Link>
        <ul>
        <li>
            <Link className='item_menu' to="/info">
              Info
            </Link>
          </li>
          <li>
            <Link className='item_menu' to="/favorite">
              Favoritos
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
