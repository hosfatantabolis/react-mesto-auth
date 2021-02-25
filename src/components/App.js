import React from "react";
import {
  Route,
  useHistory,
  Switch,
  BrowserRouter,
  Redirect,
} from "react-router-dom";
import spinner from "../images/spinner.gif";
import Header from "./Header";
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ConfirmPopup from "./ConfirmPopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import api from "../utils/api";
import auth from "../utils/auth";
import CurrentUserContext from "../contexts/CurrentUserContext";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const history = useHistory();
  const [successState, setSuccessState] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      tokenCheck(jwt);
    }
  }, []);
  const handleLogin = (password, email) => {
    return auth
      .login(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          api.setHeaders(data.token);
          setEmail(email);
          setLoggedIn(true);
        }

      })
      .catch((err) => {
        if (err.status === 401) {
          console.log("Пользователь с таким e-mail не найден");
        } else if (err.status === 400) {
          console.log("Не передано одно из полей");
        } else {
          console.log("Неизвестная ошибка: " + err.status);
        }
        handleInfoTooltip();
      });
  };
  const handleRegister = (password, email) => {
    return auth
      .register(password, email)
      .then((data) => {
        console.log(data);
        if (data.message) {
          setSuccessState(false);
          return;
        } else {
          setSuccessState(true);
        }

        handleInfoTooltip();
        return data;
      })
      .catch((err) => {
        setSuccessState(false);
        if (err.status === 400) {
          console.log("Некорректно заполнено одно из полей ");
        } else {
          console.log("Неизвестная ошибка: " + err.status);
        }
        handleInfoTooltip();
      });
  };
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setEmail("");
  };
  const tokenCheck = (jwt) => {
    auth
      .tokenCheck(jwt)
      .then((res) => {
        api.setHeaders(jwt);
        setEmail(res.email);
        setCurrentUser(res);
        setLoggedIn(true);
        history.push("/");
       // return true;
      })
      .catch((err) => {
        if (err.status === 401) {
          console.log("Переданный токен некорректен. Ошибка: " + err.status);
        }
      });
  };
  // О пользователе
  const [currentUser, setCurrentUser] = React.useState({
    name: "Загрузка...",
    about: "Загрузка...",
    avatar: spinner,
  });
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isInfotooltipPopupOpen, setIsInfotooltipPopupOpen] = React.useState(
    false
  );
  const [selectedCard, setSelectedCard] = React.useState();

  React.useEffect(() => {
    if (loggedIn === true) {
      api
      .getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [loggedIn]);

  function handleUpdateUser(user) {
    setIsLoading(true);
    api
      .setUserInfo(user.name, user.about)
      .then((res) => {
        if (res.ok) {
          setCurrentUser(user);
          setIsLoading(false);
          closeAllPopups();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api
      .updateAvatar(avatar)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        setCurrentUser(res);
        setIsLoading(false);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // О карточках
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    if (loggedIn === true) {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
    }

  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((res) => {
        console.log(res);
      });
  }
  function handleConfirmCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then((res) => {
        if (res.ok) {
          const newCards = cards.filter(function (c) {
            return c._id !== card._id;
          });
          setCards(newCards);
          closeAllPopups();
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleCardDelete(card) {
    setSelectedCard(card);
    setIsConfirmPopupOpen(true);
  }

  function handleAddPlaceSubmit(name, link) {
    setIsLoading(true);
    api
      .addCard(name, link)
      .then((res) => {
        setCards([res, ...cards]);
        setIsLoading(false);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Кнопки интерфейса и попапы
  const [isLoading, setIsLoading] = React.useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleConfirmClick() {
    setIsConfirmPopupOpen(true);
  }
  function handleInfoTooltip() {
    setIsInfotooltipPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfotooltipPopupOpen(false);
    setSelectedCard();
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="wrapper">
          <div className="page">
            <BrowserRouter history={history}>
              <Header
                loggedIn={loggedIn}
                email={email}
                onLogout={handleLogout}
              />
              <Switch>
                <ProtectedRoute
                  exact
                  path="/"
                  loggedIn={loggedIn}
                  component={Main}
                  handleEditAvatarClick={handleEditAvatarClick}
                  handleEditProfileClick={handleEditProfileClick}
                  handleAddPlaceClick={handleAddPlaceClick}
                  handleConfirmClick={handleConfirmClick}
                  handleCardClick={handleCardClick}
                  handleCloseAllPopups={closeAllPopups}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
                <Route exact path="/signin" loggedIn={loggedIn} component={Login}>
                  {loggedIn ? (
                    <Redirect to="/" />
                  ) : (
                    <Login onLogin={handleLogin} />
                  )}
                </Route>
                <Route exact path="/signup" loggedIn={loggedIn} component={Register}>
                  {loggedIn ? (
                    <Redirect to="/" />
                  ) : (
                    <Register onRegister={handleRegister} />
                  )}
                </Route>
                <Route path="/*" loggedIn={loggedIn} component={Register}>
                  {loggedIn ? (
                    <Redirect to="/" />
                  ) : (
                    <Register onRegister={handleRegister} />
                  )}
                </Route>
              </Switch>
              <Footer />
            </BrowserRouter>
            {/* Попап редактирования аватара */}
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              isLoading={isLoading}
            />

            {/* Попап редактирования профиля */}
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              isLoading={isLoading}
            />
            {/* Попап добавления карточки */}
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
              isLoading={isLoading}
            />
            {/* Попап подтверждения */}
            <ConfirmPopup
              isOpen={isConfirmPopupOpen}
              onClose={closeAllPopups}
              isLoading={isLoading}
              card={selectedCard}
              onConfirm={handleConfirmCardDelete}
            />
            {/* Попап с картинкой */}
            <ImagePopup
              card={selectedCard}
              handleCloseAllPopups={closeAllPopups}
              isOpen={isImagePopupOpen}
            />
            <InfoTooltip
              isOpen={isInfotooltipPopupOpen}
              onClose={closeAllPopups}
              successState={successState}
            />
          </div>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
