import PopupWithForm from "./PopupWithForm";
import InputWithRef from "./InputWithRef";
import React, { useRef, useEffect, useState } from "react";
import Popup from "./Popup";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, isSaving }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const ref = useRef(null);

  // Function to update username and user description on submit
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: ref.current.value,
    });
  }

  function handleOnInput(e) {
    if (!e.target.validity.valid) {
      setErrorMessage(e.target.validationMessage);
    } else {
      setErrorMessage("");
    }
  }

  useEffect(() => {
    ref.current.value = "";
  }, [isOpen]);

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <PopupWithForm
        isOpen={isOpen}
        onClose={onClose}
        name="avatar-image"
        title="Обновить аватар"
        buttonText={isSaving ? "Сохранение..." : "Сохранить"}
        formName="avatar-form"
        onSubmit={handleSubmit}
      >
        <InputWithRef
          labelClassName="form__field form__field_row_second"
          ref={ref}
          name="url"
          id="avatar-image-link"
          type="url"
          placeholder="Ссылка на картинку"
          className="popup__input popup__avatar-image-link form__input"
          onInput={handleOnInput}
          required
        />
        <span className="popup__input-error">{errorMessage}</span>
      </PopupWithForm>
    </Popup>
  );
};

export default EditAvatarPopup;
