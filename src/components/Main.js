import React from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";
function Main({
  handleEditAvatarClick,
  handleEditProfileClick,
  handleAddPlaceClick,
  handleCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__group">
          <div className="profile__photo-group">
            <div
              className="profile__edit-avatar"
              onClick={handleEditAvatarClick}
            ></div>
            <img
              src={currentUser.avatar}
              alt="Моё фото"
              className="profile__avatar"
            />
          </div>
          <div className="profile__info">
            <div className="profile__row">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__edit-btn"
                aria-label="Редактировать профиль"
                onClick={handleEditProfileClick}
              ></button>
            </div>
            <p className="profile__profession">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-btn"
          aria-label="Добавить фото"
          onClick={handleAddPlaceClick}
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
