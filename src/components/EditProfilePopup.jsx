import React, { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";
import Popup from "./Popup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useFormWithValidation from "../hooks/loginForm/useFormWithValidation";

const EditProfilePopup = ({
  isOpen,
  onClose,
  onUpdateUser,
  isSaving,
  handleKeyUp,
}) => {
  const { values, errors, setValues, handleChange, resetForm } =
    useFormWithValidation();
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (isOpen) {
      resetForm();

      setValues({
        name: currentUser.name,
        about: currentUser.about,
      });
    }
  }, [currentUser, isOpen]);
  // Function to update username and user description on submit
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: values.name.trim().replace(/\s+/g, " "),
      about: values.about.trim().replace(/\s+/g, " "),
    });
  }

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <PopupWithForm
        isOpen={isOpen}
        onClose={onClose}
        name="user"
        title="Редактировать профил"
        buttonText={isSaving ? "Сохранение..." : "Сохранить"}
        formName="profile-form"
        onSubmit={handleSubmit}
        handleKeyUp={handleKeyUp}
      >
        <>
          <Input
            labelClassName="form__field form__field_row_first"
            value={values.name || ""}
            onChange={handleChange}
            name="name"
            id="username"
            type="text"
            placeholder="name"
            className="popup__input popup__user-name form__input"
            minLength="2"
            maxLength="40"
            error={errors.name}
          />
          <Input
            labelClassName="form__field form__field_row_second"
            value={values.about || ""}
            onChange={handleChange}
            name="about"
            id="occupation"
            type="text"
            placeholder="occupation"
            className="popup__input popup__occupation form__input"
            minLength="2"
            maxLength="2000"
            error={errors.description}
          />
        </>
      </PopupWithForm>
    </Popup>
  );
};

export default EditProfilePopup;
