import PopupWithForm from "./PopupWithForm";
import React from "react";
function ConfirmPopup({ isOpen, onClose, onConfirm, card, isLoading }) {
  function handleSubmit(e) {
    e.preventDefault();
    onConfirm(card);
  }
  return (
    <PopupWithForm
      title="Вы уверены?"
      isOpen={isOpen}
      name="confirm"
      buttonText="Да"
      handleCloseAllPopups={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
}
export default ConfirmPopup;
