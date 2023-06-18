const Register = () => {
  return (
    <div className='register'>
      <h2 className='register__heading heading'>Регистрация</h2>
      <form className='register__form form-register'>
        <fieldset className='form-register__fieldset'>
          <input
            className='form-register__input'
            placeholder='Email'
            type='email'
            minLength='2'
            maxLength='40'
          />
          <input
            className='form-register__input'
            placeholder='Пароль'
            type='password'
            minLength='2'
            maxLength='40'
          />
        </fieldset>
        <button className='form-register__button'>Зарегистрироваться</button>
        <div className='form-register__link link-register'>
          <a className='link-register__text' href='/sign-in'>
            Уже зарегистрированы? Войти
          </a>
        </div>
      </form>
    </div>
  );
};

export default Register;
