import logo from "../images/header-logo.svg";
import { useLocation, Link } from "react-router-dom";
import React, { useState } from "react";

export default function Header({ emailShow, handleSignOut }) {
  const [isBurgerMenuActive, setIsBurgerMenuActive] = useState(false);
  const location = useLocation();
  function showNavbar() {
    setIsBurgerMenuActive(!isBurgerMenuActive);
  }
  function resetOnSignOut() {
    handleSignOut();
    setIsBurgerMenuActive(false);
  }

  return (
    <header className={isBurgerMenuActive ? "header header_active" : "header"}>
      <img src={logo} alt="Mesto logo." className="header__logo" />
      {location.pathname !== "/sign-in" && location.pathname !== "/" && (
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      )}
      {location.pathname !== "/sign-up" && location.pathname !== "/" && (
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      )}
      {location.pathname === "/" && (
        <>
          <div
            className={
              isBurgerMenuActive
                ? "header__info-container_active header__info-container"
                : "header__info-container"
            }
          >
            <p className="header__text">{emailShow}</p>
            <button className="header__signout" onClick={resetOnSignOut}>
              Выйти
            </button>
          </div>
          <button
            className={
              isBurgerMenuActive
                ? "header__burger-menu header__burger-menu_active"
                : "header__burger-menu"
            }
            onClick={showNavbar}
          >
            <span className="header__burger-span"></span>
            <span className="header__burger-span"></span>
            <span className="header__burger-span"></span>
          </button>
        </>
      )}
    </header>
  );
}
