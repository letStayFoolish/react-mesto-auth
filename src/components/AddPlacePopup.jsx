import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";
import Popup from "./Popup";
import useFormWithValidation from "../hooks/loginForm/useFormWithValidation";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, isSaving }) => {
  const { values, errors, handleChange, resetForm } = useFormWithValidation();

  // Hook to clear inputs fields on every single submit action while adding new card(place).
  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  // Handler action on submit
  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: values.name,
      link: values.link,
    });
  }

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <PopupWithForm
        isOpen={isOpen}
        onClose={onClose}
        name="item"
        title="Новое место"
        buttonText={isSaving ? "Сохранение..." : "Сохранить"}
        formName="place-form"
        onSubmit={handleSubmit}
      >
        <Input
          labelClassName="form__field form__field_row_first"
          value={values.name || ""}
          onChange={handleChange}
          name="name"
          id="image-name"
          type="text"
          placeholder="Название"
          className="popup__input popup__image-name form__input"
          minLength="2"
          required
          error={errors.name}
        />
        <Input
          labelClassName="form__field form__field_row_second"
          value={values.link || ""}
          onChange={handleChange}
          name="link"
          id="image-link"
          type="url"
          placeholder="Ссылка на картинку"
          className="popup__input popup__image-link form__input"
          minLength="2"
          required
          error={errors.link}
        />
      </PopupWithForm>
    </Popup>
  );
};

export default AddPlacePopup;
