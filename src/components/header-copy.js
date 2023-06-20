import logo from "../images/header-logo.svg";
import { useLocation, Link } from "react-router-dom";
import React, { useState } from "react";

export default function Header({ emailShow, handleSignOut }) {
  const [navbar, setNavbar] = useState(false);
  const [navbarRow, setNavbarRow] = useState(false);

  function handleNavbar() {
    setNavbar((navbar) => !navbar);
  }
  const flexRow = { flexDirection: navbarRow ? "row" : "reverse-column" };
  const location = useLocation();
  return (
    <header className="header" style={flexRow}>
      <div className="header__container">
        <img src={logo} alt="Mesto logo." className="header__logo" />
        {location.pathname === "/" && (
          <button
            onClick={handleNavbar}
            className={`header__burger-menu ${
              navbar ? "header__burger-menu_open" : "header__burger-menu_close"
            }`}
          />
        )}
      </div>
      <nav className={"header__nav-bar header__nav-bar_active"}>
        <ul className="header__list">
          {location.pathname !== "/sign-in" && location.pathname !== "/" && (
            <li className="header__list_item">
              <Link to="/sign-in" className="header__link">
                Войти
              </Link>
            </li>
          )}
          {location.pathname !== "/sign-up" && location.pathname !== "/" && (
            <li className="header__list_item">
              <Link to="/sign-up" className="header__link">
                Регистрация
              </Link>
            </li>
          )}
          {location.pathname === "/" && (
            <li className="header__list_item">
              <p className="header__text">{emailShow}</p>
              <Link
                to="/sign-in"
                className="header__signout"
                onClick={handleSignOut}
              >
                Выйти
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
