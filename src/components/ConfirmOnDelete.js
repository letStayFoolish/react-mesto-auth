import React from 'react';
import PopupWithForm from './PopupWithForm';
import Popup from './Popup';

const ConfirmOnDelete = ({
  isOpen,
  onClose,
  onCardDelete,
  card,
  isDeleting,
}) => {
  // Function to confirm deleting card on submit
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(card);
  }
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <PopupWithForm
        isOpen={isOpen}
        onClose={onClose}
        name='areyousure'
        title='Вы уверены?'
        buttonText={isDeleting ? 'Удаляю...' : 'Да'}
        formName='cofirmation-form'
        onSubmit={handleSubmit}
      />
    </Popup>
  );
};

export default ConfirmOnDelete;
