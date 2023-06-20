import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmOnDelete from "./ConfirmOnDelete";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import * as auth from "../utils/auth";

function App() {
  // React Hooks - useState:
  // Handler to change button text while saving user information
  const [isSavingEditProfilePopup, setIsSavingEditProfilePopup] =
    useState(false);
  // Handler to change button text Log-in -> Logging-in:
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  // Handler to change button text Sign-up -> Signing-up:
  const [isSigningUp, setIsSigningUp] = useState(false);
  // Handler to change button text Log-in -> Logging-in:
  // Handler to change button text while adding new card(place)
  const [isSavingAddPlacePopup, setIsSavingAddPlacePopup] = useState(false);
  // Handler to change button text while saving user information
  const [isSavingEditAvatarPopup, setIsSavingEditAvatarPopup] = useState(false);
  // Handler to change button text while deleting card
  const [isSavingConfirmationPopup, setIsSavingConfirmationPopup] =
    useState(false);
  // Handler to change user's state logged-in or not:
  // !!! Change default state isLoggedIn: false -> null
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Handler to change popup-info text and image based on registration success:
  const [onSuccess, setOnSuccess] = useState(false);
  // Handler to get email from API data to show it on main page (header):
  const [emailShow, setEmailShow] = useState(null);
  // State to open/close popup with information about success registration:
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  // State to open/close popup for profile editing:
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  // State to open/close popup for adding new place:
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  // State to open/close popup for change profile image:
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  // State to open/close popup for change profile image:
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  // State to open/close full-screen image on-click, depending on what card is selected:
  const [selectedCard, setSelectedCard] = useState(null);
  // State to set default values for username, user occupation & user avatar(as a default there should not be an image):
  const [currentUser, setCurrentUser] = useState({
    name: "Chili",
    about: "Outdoorist | Traveler | Student",
    avatar: "",
  });
  // State to set default card array as an empty array:
  const [cards, setCards] = useState([]);
  // State to remove card:
  const [removedCard, setRemovedCard] = useState(null);
  // Navigate state to navigate user to another page:
  const navigate = useNavigate();
  // React Hook - useEffect, using this hook, firstly we do:
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
          `Error while requesting to GET profile and cards information from API: ${error.message}`
        )
      );
  }, []);
  // Handler functions:
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
  // Handler-function
  function handleInfoTooltipPopupOpen() {
    setIsInfoTooltipPopupOpen(true);
  }
  // Function to change state isLoggingIn from false to true:
  function handleIsLoggedIn() {
    setIsLoggedIn(true);
  }
  // Function to add/remove card like, requesting and receiving response from api:
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    if (isLiked) {
      api
        .removeLikes(card._id)
        .then((res) => {
          setCards((state) => state.map((c) => (c._id === card._id ? res : c)));
        })
        .catch((err) =>
          console.error(
            `Error while requesting to DELETE like on API: ${err.message}`
          )
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
            `Error while requesting to PUT card like on API: ${err.message}`
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
    setIsInfoTooltipPopupOpen(false);
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
          `Error while requesting to DELETE card from API: ${error.message}`
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
          `Error while requesting to PATCH new user info on API: ${error.message}`
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
          `Error while requesting to PATCH new user avatar on API: ${error.message}`
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
          `Error while requesting to PUT new card(place) on API: ${error.message}`
        )
      )
      .finally(() => setIsSavingAddPlacePopup(false));
  }
  // Function to send new user's email and password to API so we could send user on log-in page on a successful registration
  function onSignup(email, password) {
    if (!email || !password) {
      // window.alert('Please fill in all fields')
      return;
    }
    setIsSigningUp(true);
    auth
      .register(email, password)
      .then(() => {
        navigate("/sign-in", { replace: true });
        setOnSuccess(true);
      })
      .catch((error) => {
        setOnSuccess(false);
        console.error(`Error: ${error.message}`);
      })
      .finally(() => {
        handleInfoTooltipPopupOpen();
        setIsSigningUp(false);
      });
  }
  // Function to make user get logged-in
  function onSignin(email, password) {
    if (!email || !password) {
      return;
    }
    setIsLoggingIn(true);
    auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        navigate("/", { replace: true });
        setIsLoggedIn(true);
        setEmailShow(email);
      })
      .catch((error) => console.error(`Error: ${error.message}`))
      .finally(() => setIsLoggingIn(false));
  }
  // Function to keep user logged-in if his token is already stored:
  const checkToken = () => {
    const token = localStorage.getItem("jwt");
    auth
      .getContent(token)
      .then((data) => {
        if (!data) {
          return;
        }
        setIsLoggedIn(true);
        navigate("/", { replace: true });
        setEmailShow(data.data.email);
      })
      .catch((error) => {
        setIsLoggedIn(false);
        console.error(`Error: ${error.message}`);
      });
  };
  // State to authenticate user's token:
  useEffect(() => {
    checkToken();
  }, []);
  // Function handle on sign-out button pressed:
  function handleSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/sign-in", { replace: true });
    setEmailShow("");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="wrapper">
          <Header emailShow={emailShow} handleSignOut={handleSignOut} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  isLoggedIn={isLoggedIn}
                  onCardClick={setSelectedCard}
                  onEditProfile={handleEditProfilePopupOpen}
                  onAddPlace={handleAddPlacePopupOpen}
                  onEditAvatar={handleEditAvatarPopupOpen}
                  onCardLike={handleCardLike}
                  onCardDelete={handleConfirmationPopupOpen}
                  cards={cards}
                />
              }
            />
            <Route
              path="/sign-up"
              element={
                isLoggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <Register
                    onClose={closeAllPopups}
                    onSignup={onSignup}
                    isSigningUp={isSigningUp}
                  />
                )
              }
            />
            <Route
              path="/sign-in"
              element={
                isLoggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <Login
                    onClose={closeAllPopups}
                    onSignin={onSignin}
                    isLoggingIn={isLoggingIn}
                  />
                )
              }
            />
          </Routes>
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
          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            isSuccess={onSuccess}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
