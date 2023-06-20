import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ onSignup, isSigningUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSignup(email, password);
  }

  return (
    <div className="register">
      <h2 className="register__heading heading">Регистрация</h2>
      <form className="register__form form-register" onSubmit={handleSubmit}>
        <fieldset className="form-register__fieldset">
          <input
            className="form-register__input"
            placeholder="Email"
            type="email"
            minLength="2"
            maxLength="40"
            onChange={handleChangeEmail}
            value={email}
            name="email"
            autoComplete="login"
            required
          />
          <input
            className="form-register__input"
            placeholder="Пароль"
            type="password"
            minLength="2"
            maxLength="40"
            onChange={handleChangePassword}
            value={password}
            name="password"
            autoComplete="on"
            required
          />
        </fieldset>
        <button className="form-register__button">
          {isSigningUp ? "Регистрация..." : "Зарегистрироваться"}
        </button>
        <div className="form-register__signin signin">
          <p className="signin__text">
            Уже зарегистрированы?&nbsp;
            <Link className="signin__link" to="/sign-in">
              Войти
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
