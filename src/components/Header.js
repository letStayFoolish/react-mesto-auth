import { useLocation, Link } from 'react-router-dom';
import React from 'react';

export default function Header() {
  const location = useLocation();
  return (
    <header className='header'>
      <div>
        <a href='/' target='_blank' className='header__logo'></a>
      </div>
      <nav className='header__nav-bar'>
        <ul className='header__list'>
          {location.pathname !== '/sign-in' && (
            <li>
              <Link to='/sign-in' className='header__link'>
                Войти
              </Link>
            </li>
          )}
          {location.pathname !== '/sign-up' && (
            <li>
              <Link to='/sign-up' className='header__link'>
                Регистрация
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
