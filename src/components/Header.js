import logo from "../images/logo-light.svg";
import React from "react";
import { Link, useLocation } from "react-router-dom";
function Header({ loggedIn, email, onLogout }) {
  let location = useLocation();

  let buttonText = "";
  let linkTo = "";
  if (location.pathname === "/signin" && loggedIn === false) {
    buttonText = "Регистрация";
    linkTo = "/signup";
  } else if (location.pathname === "/signup" && loggedIn === false) {
    buttonText = "Войти";
    linkTo = "/signin";
  } else if (location.pathname === "/" && loggedIn === true) {
    buttonText = "Выйти";
  }

  return (
    <header className="header">
      <img src={logo} alt="Логотип Mesto" className="logo" />
      <div className="header__auth-group">
        <p className="header__email">{email}</p>
        {loggedIn ? (
          <button className="header__button" onClick={onLogout}>
            Выйти
          </button>
        ) : (
          <Link to={linkTo}>
            <button className="header__button">{buttonText}</button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
