import useFormWithValidation from "../hooks/loginForm/useFormWithValidation";
import React from "react";

const Login = ({ onSignIn, isLoggingIn }) => {
  const { values, errors, handleChange } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();

    const { email, password } = values;

    onSignIn({
      email: email.trim().replace(/\s+/g, " "),
      password: password,
    });
  }

  return (
    <div className="login">
      <h2 className="login__heading heading">Вход</h2>
      <form className="login__form form-login" onSubmit={handleSubmit}>
        <fieldset className="form-login__fieldset">
          <input
            className="form-login__input"
            placeholder="Email"
            name="email"
            type="email"
            value={values.email || ""}
            onChange={handleChange}
            minLength="5"
            maxLength="40"
            autoComplete="login"
            required
          />
          <span className="popup__input-error">
            {errors.email && `Please enter a valid email address.`}
          </span>
          <input
            className="form-login__input"
            placeholder="Пароль"
            name="password"
            type="password"
            value={values.password || ""}
            onChange={handleChange}
            minLength="6"
            maxLength="40"
            autoComplete="on"
            required
          />
          <span className="popup__input-error">
            {errors.password && `Please enter a valid password.`}
          </span>
        </fieldset>
        <button className="form-login__button">
          {isLoggingIn ? "Вход в систему..." : "Войти"}
        </button>
      </form>
    </div>
  );
};

export default Login;
