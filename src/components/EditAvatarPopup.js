import PopupWithForm from './PopupWithForm';
import InputWithRef from './InputWithRef';
import { useRef, useEffect } from 'react';
import Popup from './Popup';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, isSaving }) => {
  const ref = useRef(null);
  // Function to update user name and user description on submit
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: ref.current.value,
    });
  }
  useEffect(() => {
    ref.current.value = '';
  }, [isOpen]);

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <PopupWithForm
        isOpen={isOpen}
        onClose={onClose}
        name='avatar-image'
        title='Обновить аватар'
        buttonText={isSaving ? 'Сохранение...' : 'Сохранить'}
        formName='avatar-form'
        onSubmit={handleSubmit}
      >
        <InputWithRef
          labelClassName='form__field form__field_row_second'
          ref={ref}
          name='popup-avatar-image-link'
          id='avatar-image-link'
          type='url'
          placeholder='Ссылка на картинку'
          className='popup__input popup__avatar-image-link form__input'
        />
      </PopupWithForm>
    </Popup>
  );
};

export default EditAvatarPopup;
