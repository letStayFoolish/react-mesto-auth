import React from "react";
import { Link } from "react-router-dom";
import useFormWithValidation from "../hooks/loginForm/useFormWithValidation";

const Register = ({ onSignup, isSigningUp }) => {
  const { values, errors, handleChange } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();

    onSignup({
      email: values.email.trim().replace(/\s+/g, " "),
      password: values.password,
    });
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
            minLength="5"
            maxLength="40"
            onChange={handleChange}
            value={values.email || ""}
            name="email"
            autoComplete="login"
            required
          />
          <span className="popup__input-error">
            {errors.email && `Please enter a valid email address`}
          </span>
          <input
            className="form-register__input"
            placeholder="Пароль"
            type="password"
            minLength="6"
            maxLength="40"
            onChange={handleChange}
            value={values.password || ""}
            name="password"
            autoComplete="on"
            required
          />
          <span className="popup__input-error">
            {errors.password &&
              `Your password must be at least 8 characters including a lowercase letter, an uppercase letter, and a number`}
          </span>
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
