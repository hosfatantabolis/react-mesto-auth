import PopupWithForm from "./PopupWithForm";
import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [buttonStateDisabled, setButtonStateDisabled] = React.useState(true);

  //спаны ошибок
  const [nameInputError, setNameInputError] = React.useState();
  const [descriptionInputError, setDescriptionInputError] = React.useState();

  //инпуты
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  React.useEffect(() => {
    setButtonStateDisabled(true);
    setNameInputError("");
    setDescriptionInputError("");
  }, [isOpen]);


  React.useEffect(() => {
    if (nameInputError === "" && descriptionInputError === "") {
      setButtonStateDisabled(false);
    }
  }, [name, description, descriptionInputError, nameInputError]);

  function validate(e) {
    if (e.target.validity.valid === false) {
      if (e.target.id === "profile-name") {
        setButtonStateDisabled(true);
        setNameInputError(e.target.validationMessage);
      }
      if (e.target.id === "profile-profession") {
        setButtonStateDisabled(true);
        setDescriptionInputError(e.target.validationMessage);
      }
    } else if (e.target.validity.valid === true) {
      if (e.target.id === "profile-name") {
        setNameInputError(e.target.validationMessage);
      }
      if (e.target.id === "profile-profession") {
        setDescriptionInputError(e.target.validationMessage);
      }
    }
  }

  function handleNameChange(e) {
    setName(e.target.value);
    validate(e);
  }

  function handleDesriptionChange(e) {
    setDescription(e.target.value);
    validate(e);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
      avatar: currentUser.avatar,
    });
  }
  return (
    <PopupWithForm
      buttonStateDisabled={buttonStateDisabled}
      title="Редактировать профиль"
      isOpen={isOpen}
      name="edit-info"
      buttonText="Сохранить"
      handleCloseAllPopups={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <>
        <label className="popup__field">
          <input
            onChange={handleNameChange}
            value={name}
            type="text"
            minLength="2"
            maxLength="40"
            id="profile-name"
            className="popup__input popup__input_type_name"
            placeholder="Имя профиля"
            required
          />
          <span
            className={`popup__error ${
              nameInputError ? "popup__error_visible" : ""
            }`}
            id="profile-name-error"
          >
            {nameInputError}
          </span>
        </label>
        <label className="popup__field">
          <input
            onChange={handleDesriptionChange}
            value={description}
            type="text"
            minLength="2"
            maxLength="200"
            id="profile-profession"
            className="popup__input popup__input_type_profession"
            placeholder="Профессия"
            required
          />
          <span
            className={`popup__error ${
              descriptionInputError ? "popup__error_visible" : ""
            }`}
            id="profile-profession-error"
          >
            {descriptionInputError}
          </span>
        </label>
      </>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
