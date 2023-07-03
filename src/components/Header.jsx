import logo from "../images/header-logo.svg";
import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";

const Header = ({ emailShow, handleSignOut }) => {
  const [isBurgerMenuActive, setIsBurgerMenuActive] = useState(false);
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
      <Routes>
        <Route
          path="/sign-up"
          element={
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/"
          element={
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
          }
        />
      </Routes>
    </header>
  );
};
export default Header;
