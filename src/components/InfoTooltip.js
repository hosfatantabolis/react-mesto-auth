import PopupWithForm from "./PopupWithForm";
import React from "react";
import goodimg from "../images/good.svg";
import badimg from "../images/bad.svg";

function InfoTooltip({ isOpen, onClose, successState }) {
  let title = "";
  let imgSource = "";
  if (successState === true) {
    title = "Вы успешно зарегистрировались!";
    imgSource = goodimg;
  } else {
    title = "Что-то пошло не так! Попробуйте ещё раз.";
    imgSource = badimg;
  }
  function handleSubmit(e) {
    e.preventDefault();
    // onConfirm(card);
  }
  return (
    <PopupWithForm
      noButton="true"
      title={title}
      imgSource={imgSource}
      isOpen={isOpen}
      name="infotooltip"
      handleCloseAllPopups={onClose}
      onSubmit={handleSubmit}
    />
  );
}
export default InfoTooltip;
