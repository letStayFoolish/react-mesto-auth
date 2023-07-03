import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

// Creating Card component and all its props
// properties card is an array (empty by default) with all needed information for every card that shall be rendered.
// properties onCardClick is State setter (function) 'setSelectedCard' to fill in needed data for Card creation (name: card.name, and so on...)
export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  function handleCardClick() {
    onCardClick({ name: card.name, alt: card.name, link: card.link });
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((like) => like._id === currentUser._id);

  return (
    <div className='card'>
      <img
        alt={card.name}
        className='card__image'
        src={card.link}
        onClick={handleCardClick}
      />
      {isOwn && (
        <button
          type='button'
          className='card__remove-btn card__remove-btn_active'
          aria-label='Кнопка удаления карточки'
          onClick={handleDeleteClick}
        ></button>
      )}
      <div className='card__info'>
        <h2 className='card__title text'>{card.name}</h2>
        <div className='card__likes'>
          <button
            type='button'
            onClick={handleLikeClick}
            className={`${
              isLiked
                ? 'card__like-btn card__like-btn_active'
                : 'card__like-btn'
            }`}
            aria-label='Кнопка для добавления/удаления лайка'
          ></button>
          <div className='card__likes_count'>{card.likes.length}</div>
        </div>
      </div>
    </div>
  );
}
