import PopupWithForm from "./PopupWithForm";
import React from "react";
function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const [link, setLink] = React.useState();
  const [linkInputError, setLinkInputError] = React.useState(false);
  const [buttonStateDisabled, setButtonStateDisabled] = React.useState(true);

  function validate(e) {
    if (e.target.validity.valid === false) {
      setButtonStateDisabled(true);
      setLinkInputError(e.target.validationMessage);
    } else {
      setButtonStateDisabled(false);
      setLinkInputError("");
    }
  }
  function handleLinkChange(e) {
    setLink(e.target.value);
    validate(e);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(link);
    setLink("");
    setButtonStateDisabled(true);
  }
  return (
    <PopupWithForm
      buttonStateDisabled={buttonStateDisabled}
      title="Обновить аватар"
      isOpen={isOpen}
      buttonText="Сохранить"
      name="update-avatar"
      handleCloseAllPopups={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <label className="popup__field">
        <input
          onChange={handleLinkChange}
          type="url"
          id="url-link"
          className="popup__input popup__input_type_link"
          placeholder="Ссылка на фото"
          required
          value={link}
        />
        <span
          className={`popup__error ${
            linkInputError ? "popup__error_visible" : ""
          }`}
          id="url-link-error"
        >
          {linkInputError}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
