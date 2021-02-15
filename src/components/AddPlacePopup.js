import PopupWithForm from "./PopupWithForm";
import React from "react";
function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  const [nameInputError, setNameInputError] = React.useState();
  const [linkInputError, setLinkInputError] = React.useState();
  const nameRef = React.useRef();
  const linkRef = React.useRef();
  const [buttonStateDisabled, setButtonStateDisabled] = React.useState(true);
  function validate() {
    if (nameRef.current.validity.valid && linkRef.current.validity.valid) {
      setButtonStateDisabled(false);
      setNameInputError("");
      setLinkInputError("");
    } else {
      setButtonStateDisabled(true);
      setNameInputError(nameRef.current.validationMessage);
      setLinkInputError(linkRef.current.validationMessage);
    }
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    onAddPlace(name, link);
    setName("");
    setLink("");
    setNameInputError("");
    setLinkInputError("");
    setButtonStateDisabled(true);
  }
  function handleNameChange(e) {
    setName(e.target.value);
    validate();
  }
  function handleLinkChange(e) {
    setLink(e.target.value);
    validate();
  }
  return (
    <PopupWithForm
      title="Новое место"
      isOpen={isOpen}
      name="add-image"
      buttonText="Сохранить"
      handleCloseAllPopups={onClose}
      onSubmit={handleAddPlaceSubmit}
      isLoading={isLoading}
      buttonStateDisabled={buttonStateDisabled}
    >
      <>
        <label className="popup__field">
          <input
            ref={nameRef}
            type="text"
            minLength="2"
            maxLength="30"
            id="card-title"
            onChange={handleNameChange}
            value={name}
            className="popup__input popup__input_type_title"
            placeholder="Название"
            required
          />
          <span
            className={`popup__error ${
              nameInputError ? "popup__error_visible" : ""
            }`}
            id="card-title-error"
          >
            {nameInputError}
          </span>
        </label>
        <label className="popup__field">
          <input
            ref={linkRef}
            type="url"
            id="card-link"
            onChange={handleLinkChange}
            value={link}
            className="popup__input popup__input_type_link"
            placeholder="Ссылка на картинку"
            required
          />
          <span
            className={`popup__error ${
              linkInputError ? "popup__error_visible" : ""
            }`}
            id="card-link-error"
          >
            {linkInputError}
          </span>
        </label>
      </>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
