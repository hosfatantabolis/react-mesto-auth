import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `${
    isOwn ? "card__delete" : "card__delete_hidden"
  }`;
  const isLiked = card.likes.some((user) => user._id === currentUser._id);
  const cardLikeButtonClassName = `${
    isLiked ? "card__like card__like_active" : "card__like"
  }`;
  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }
  return (
    <div className="card" id={`id${card._id}`}>
      <button
        type="button"
        className={cardDeleteButtonClassName}
        aria-label="Удалить карточку"
        onClick={handleDeleteClick}
      ></button>
      <img
        src={card.link}
        alt={card.name}
        className="card__photo"
        onClick={handleClick}
      />
      <div className="card__row">
        <h2 className="card__name">{card.name}</h2>
        <div className="card__column">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Мне нравится это фото"
            onClick={handleLikeClick}
          ></button>
          <p className="card__like-count">
            {card.likes.length ? card.likes.length : 0}
          </p>
        </div>
      </div>
    </div>
  );
}
export default Card;
