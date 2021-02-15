import PopupWithForm from "./PopupWithForm";
import React from "react";
function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const linkRef = React.useRef();
  const [buttonStateDisabled, setButtonStateDisabled] = React.useState(true);
  const [linkInputError, setLinkInputError] = React.useState(false);
  function validate() {
    if (linkRef.current.validity.valid) {
      setLinkInputError("");
      setButtonStateDisabled(false);
    } else {
      setLinkInputError(linkRef.current.validationMessage);
      setButtonStateDisabled(true);
    }
  }
  function handleLinkChange() {
    validate();
  }
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(linkRef.current.value);
    linkRef.current.value = "";
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
          ref={linkRef}
          onChange={handleLinkChange}
          type="url"
          id="url-link"
          className="popup__input popup__input_type_link"
          placeholder="Ссылка на фото"
          required
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
