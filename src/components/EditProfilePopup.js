import PopupWithForm from "./PopupWithForm";
import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    setName(currentUser.name);
    setButtonStateDisabled(true);
    setDescription(currentUser.about);
  }, [currentUser]);
  //инпуты
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const nameRef = React.useRef();
  const descriptionRef = React.useRef();
  //спаны ошибок
  const [nameInputError, setNameInputError] = React.useState();
  const [descriptionInputError, setDescriptionInputError] = React.useState();

  const [buttonStateDisabled, setButtonStateDisabled] = React.useState(true);

  function validate() {
    if (
      nameRef.current.validity.valid &&
      descriptionRef.current.validity.valid
    ) {
      setNameInputError("");
      setDescriptionInputError("");
      setButtonStateDisabled(false);
    } else {
      setNameInputError(nameRef.current.validationMessage);
      setDescriptionInputError(descriptionRef.current.validationMessage);
      setButtonStateDisabled(true);
    }
  }
  function handleNameChange(e) {
    setName(e.target.value);
    validate();
  }

  function handleDesriptionChange(e) {
    setDescription(e.target.value);
    validate();
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
            ref={nameRef}
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
            ref={descriptionRef}
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
