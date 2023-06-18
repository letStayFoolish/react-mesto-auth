import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmOnDelete from './ConfirmOnDelete';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';

function App() {
  // React Hooks - States
  // State to help us with opening/closing popup for profile editing:
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  // State to help us with opening/closing popup for adding new place:
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  // State to help us with opening/closing popup for change profile image:
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  // State to help us with opening/closing popup for change profile image:
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  // State to help us with open full-screen image on-click, depending what card is selected:
  const [selectedCard, setSelectedCard] = useState(null);
  // State to set default values for username, user occupation & user avatar(as a default there should not be an image):
  const [currentUser, setCurrentUser] = useState({
    name: 'Chili',
    about: 'Outdoorist | Traveler | Student',
    avatar: '',
  });
  // State to set default card array as an empty array:
  const [cards, setCards] = useState([]);
  const [removedCard, setRemovedCard] = useState(null);
  // React Hook - state Effect, using this state, firstly we do:
  // 1. Fetching profile and card data as well, all at once,
  // 2. Once we got response from API, we are setting profile information: username, user occupation, user avatar and card information (name, link, id, ...)
  // As a second argument of useEffect State, we set an empty array '[]', so this shall be called only once as we got in or refresh a page.

  useEffect(() => {
    const userInformationPromise = api.getUserInformation();
    const initialCardsPromise = api.getInitialCards();

    Promise.all([userInformationPromise, initialCardsPromise])
      .then(([userInformation, cardsInformation]) => {
        setCurrentUser({
          ...userInformation,
          name: userInformation.name,
          about: userInformation.about,
          avatar: userInformation.avatar,
        });
        setCards(cardsInformation);
      })
      .catch((error) =>
        console.error(
          `Error while requesting to GET profile and cards information from API: ${error}`
        )
      );
  }, []);

  // Handler-function to toggle true/false on popup for profile editing, so it opens or closes:
  function handleEditProfilePopupOpen() {
    setIsEditProfilePopupOpen(true);
  }
  // Handler-function to toggle true/false on popup to add new place, so it opens or closes:
  function handleAddPlacePopupOpen() {
    setIsAddPlacePopupOpen(true);
  }
  // Handler-function to toggle true/false on popup to change profile image, so it opens or closes:
  function handleEditAvatarPopupOpen() {
    setIsEditAvatarPopupOpen(true);
  }
  // Handler-function to toggle true/false on popup to confirm while deleting card, so it opens or closes:
  function handleConfirmationPopupOpen(card) {
    setRemovedCard(card);
    setIsConfirmationPopupOpen(true);
  }

  // Function to add/remove card like, requesting and reciving respons from api:
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    if (isLiked) {
      api
        .removeLikes(card._id)
        .then((res) => {
          setCards((state) => state.map((c) => (c._id === card._id ? res : c)));
        })
        .catch((err) =>
          console.error(`Error while requesting to DELETE like on API: ${err}`)
        );
    } else {
      api
        .addLikes(card._id)
        .then((res) => {
          setCards((newCardsList) =>
            newCardsList.map((c) => (c._id === card._id ? res : c))
          );
        })
        .catch((err) =>
          console.error(
            `Error while requesting to PUT card like on API: ${err}`
          )
        );
    }
  };

  // Function to close all popups on-click on close button
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsConfirmationPopupOpen(false);
  }
  // Function to remove card, requesting and receiving response from api
  const handleCardDelete = (card) => {
    setIsSavingConfirmationPopup(true);
    api
      .removeCard(card._id)
      .then(() => {
        setCards((newCardsList) =>
          newCardsList.filter((c) => c._id !== card._id)
        );
        closeAllPopups();
      })
      .catch((error) =>
        console.error(
          `Error while requesting to DELETE card from API: ${error}`
        )
      )
      .finally(() => setIsSavingConfirmationPopup(false));
  };
  // Function to change profile name and description on submit
  function handleUpdateUser({ name, about }) {
    setIsSavingEditProfilePopup(true);
    api
      .sendProfileInformation({
        name,
        about,
      })
      .then(() => {
        setCurrentUser((prevData) => {
          return { ...prevData, name, about };
        });
        closeAllPopups();
      })
      .catch((error) =>
        console.error(
          `Error while requesting to PATCH new user info on API: ${error}`
        )
      )
      .finally(() => setIsSavingEditProfilePopup(false));
  }
  // Function to update profile avatar
  function handleUpdateAvatar({ avatar }) {
    setIsSavingEditAvatarPopup(true);
    api
      .changeAvatarImage({ avatar })
      .then(() => {
        setCurrentUser((prevData) => {
          return { ...prevData, avatar };
        });
        closeAllPopups();
      })
      .catch((error) =>
        console.error(
          `Error while requesting to PATCH new user avatar on API: ${error}`
        )
      )
      .finally(() => setIsSavingEditAvatarPopup(false));
  }
  // Function to add new place on submit
  function handleAddPlaceSubmit({ name, link }) {
    setIsSavingAddPlacePopup(true);
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) =>
        console.error(
          `Error while requesting to PUT new card(place) on API: ${error}`
        )
      )
      .finally(() => setIsSavingAddPlacePopup(false));
  }

  // Handler to change button text while saving user information
  const [isSavingEditProfilePopup, setIsSavingEditProfilePopup] =
    useState(false);
  // Handler to change button text while adding new card(place)
  const [isSavingAddPlacePopup, setIsSavingAddPlacePopup] = useState(false);
  // Handler to change button text while saving user information
  const [isSavingEditAvatarPopup, setIsSavingEditAvatarPopup] = useState(false);
  // Handler to change button text while deleting card
  const [isSavingConfirmationPopup, setIsSavingConfirmationPopup] =
    useState(false);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <div className='wrapper'>
          <Header />
          <Main
            onCardClick={setSelectedCard}
            onEditProfile={handleEditProfilePopupOpen}
            onAddPlace={handleAddPlacePopupOpen}
            onEditAvatar={handleEditAvatarPopupOpen}
            onCardLike={handleCardLike}
            onCardDelete={handleConfirmationPopupOpen}
            cards={cards}
          />
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isSaving={isSavingEditProfilePopup}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isSaving={isSavingAddPlacePopup}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isSaving={isSavingEditAvatarPopup}
          />
          <ConfirmOnDelete
            isOpen={isConfirmationPopupOpen}
            onClose={closeAllPopups}
            isDeleting={isSavingConfirmationPopup}
            card={removedCard}
            onCardDelete={handleCardDelete}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
