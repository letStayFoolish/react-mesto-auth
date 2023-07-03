import React from "react";
import Popup from "./Popup";

// Creating ImagePopup Component with its two properties
// Card, so we can set Card info if it is clicked to be opened on a full-screen. We are using card info for setting name, alt and link in a combination with conditional operator
// ...so it depends weather we clicked on image or not. When we click, handler 'handleCardClick' (from Card component) shall be called, so the setter from Main component
// Well, with this State we successfully set/update 'selectedCard' object: name, alt & link.
// Also, we are using onClose handler(closeAllPopups) as a props that we are passing from an App component. It is used to close full-screen mode and return to the default view.
const ImagePopup = ({ card, onClose }) => {
  return (
    <Popup isOpen={card} onClose={onClose}>
      <div className={`popup popup_type_image ${card ? "popup_opened" : ""}`}>
        <div className="popup__container">
          <figure className="popup__image">
            <button
              type="button"
              onClick={onClose}
              className="popup__close-btn popup__close-btn_type_image"
              aria-label="Кнопка закрытия модального окна"
            ></button>
            <img
              alt={card && card.alt}
              className="popup__img"
              src={card && card.link}
            />
            <figcaption className="popup__heading">
              {card && card.name}
            </figcaption>
          </figure>
        </div>
      </div>
    </Popup>
  );
};
export default ImagePopup;
