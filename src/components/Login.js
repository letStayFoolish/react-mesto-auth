const Login = () => {
  return (
    <div className='login'>
      <h2 className='login__heading heading'>Вход</h2>
      <form className='login__form form-login'>
        <fieldset className='form-login__fieldset'>
          <input
            className='form-login__input'
            placeholder='Email'
            type='email'
            minLength='2'
            maxLength='40'
          />
          <input
            className='form-login__input'
            placeholder='Пароль'
            type='password'
            minLength='2'
            maxLength='40'
          />
        </fieldset>
        <button className='form-login__button'>Войти</button>
      </form>
    </div>
  );
};

export default Login;
