import imageOnSuccess from '../images/success.png';
import imageOnFail from '../images/fail.png';

const InfoTooltip = ({ onClose, isOpen, isSuccess }) => {
  return (
    <div
      className={`popup popup_type_info-tool-tip ${
        isOpen ? 'popup_opened' : ''
      }`}
    >
      <div className='popup__container'>
        <div className='popup__body'>
          <button
            type='button'
            onClick={onClose}
            className={`popup__close-btn`}
            aria-label='Кнопка закрытия модального окна'
          />
          <div
            className='popup__sign'
            style={
              isSuccess
                ? { backgroundImage: `url(${imageOnSuccess})` }
                : { backgroundImage: `url(${imageOnFail})` }
            }
          />
          <h2 className='popup__text'>
            {isSuccess
              ? 'Вы успешно зарегистрировались!'
              : 'Что-то пошло не так! Попробуйте ещё раз.'}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default InfoTooltip;
