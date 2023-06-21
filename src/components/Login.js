import React, { useState } from "react";

const Login = ({ onSignIn, isLoggingIn }) => {
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
    onSignIn(email, password);
  }

  return (
    <div className="login">
      <h2 className="login__heading heading">Вход</h2>
      <form className="login__form form-login" onSubmit={handleSubmit}>
        <fieldset className="form-login__fieldset">
          <input
            className="form-login__input"
            placeholder="Email"
            type="email"
            minLength="2"
            maxLength="40"
            onChange={handleChangeEmail}
            name="email"
            value={email}
            autoComplete="login"
            required
          />
          <input
            className="form-login__input"
            placeholder="Пароль"
            type="password"
            minLength="2"
            maxLength="40"
            onChange={handleChangePassword}
            name="password"
            value={password}
            autoComplete="on"
            required
          />
        </fieldset>
        <button className="form-login__button">
          {isLoggingIn ? "Вход в систему..." : "Войти"}
        </button>
      </form>
    </div>
  );
};

export default Login;
