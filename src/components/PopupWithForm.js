function PopupWithForm({
  name,
  onSubmit,
  isLoading,
  isOpen,
  handleCloseAllPopups,
  title,
  buttonText,
  children,
  buttonStateDisabled,
  noButton,
  imgSource,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-btn"
          aria-label="Закрыть окно"
          onClick={handleCloseAllPopups}
        ></button>
        <div className="popup__elements">
          {noButton && (
            <img
              className="popup__result-image"
              src={imgSource}
              alt="результат"
            />
          )}
          <h2 className="popup__title">{title}</h2>
          <form
            action="submit"
            className="popup__form"
            name={name}
            onSubmit={onSubmit}
            noValidate
          >
            {children}

            {!noButton && (
              <button
                type="submit"
                className={`popup__save ${
                  buttonStateDisabled ? "popup__save_disabled" : ""
                }`}
                aria-label="Сохранить"
                disabled={buttonStateDisabled}
              >
                {" "}
                {isLoading ? "Сохранение..." : buttonText}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;
