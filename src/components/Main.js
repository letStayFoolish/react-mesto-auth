import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

// Creating Main component and all its props
// Main component includes sections: edit profile; add new place; change profile image (avatar).
// Also in Main component we do request/response to API, about profile information and card information as well.
const Main = ({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) => {
  const userInformation = useContext(CurrentUserContext);

  const cardElements = cards.map((card) => {
    return (
      <Card
        card={card}
        key={card._id}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
      />
    );
  });
  // JSX markup to be render on a page:
  return (
    <main className="main container">
      <section className="profile">
        <div className="profile__block">
          <div className="profile__avatar-block">
            <button
              onClick={onEditAvatar}
              type="button"
              className="profile__edit-avatar"
              aria-label="Кнопка редактирования изображения аватара."
            />
            <img
              onClick={onEditAvatar}
              src={userInformation.avatar}
              alt="Профильный аватар."
              className="profile__avatar"
            />
          </div>
          <div className="profile__user">
            <div className="profile__edit">
              <h1 className="profile__user-name">{userInformation.name}</h1>
              <button
                onClick={onEditProfile}
                type="button"
                className="profile__edit-btn"
                aria-label="Кнопка редактирования профиля"
              ></button>
            </div>
            <p className="profile__user-occupation">{userInformation.about}</p>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          type="button"
          className="profile__add-btn"
          aria-label="Кнопка добавления карточки"
        ></button>
      </section>
      <section className="places">{cardElements}</section>
    </main>
  );
};
export default Main;
