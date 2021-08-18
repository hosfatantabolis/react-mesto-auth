import React from "react";
function ImagePopup({ isOpen, handleCloseAllPopups, card }) {
  function handleEsc(event) {
    if (event.key !== "Escape") {
      return;
    }
    handleCloseAllPopups();
  }
  React.useEffect(() => {
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen]);
  return (
    <div
      className={`popup popup_type_view-image ${
        card && isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container popup__container_type_image">
        <button
          type="button"
          className="popup__close-btn"
          aria-label="Закрыть окно"
          onClick={handleCloseAllPopups}
        ></button>
        <figure className="popup__figure">
          <img
            src={card && card.link}
            alt={card && card.name}
            className="popup__image"
          />
          <figcaption className="popup__caption">
            {card && card.name}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
export default ImagePopup;
