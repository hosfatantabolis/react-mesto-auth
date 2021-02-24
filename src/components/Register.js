import { useState } from "react";
import { useHistory, withRouter } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [data, setData] = useState({ email: "", password: "" });
  const history = useHistory();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(data.password, data.email).then((data) => {
      if (data) {
        history.push("/signin");
      }
    });
  };

  return (
    <div className="auth auth_type_register">
      <h2 className="auth__title">Регистрация</h2>
      <form onSubmit={handleSubmit} className="auth__form">
        <input
          id="email"
          type="email"
          name="email"
          className="auth__input auth__input_type_email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          required
        ></input>
        <input
          id="password"
          type="password"
          name="password"
          className="auth__input auth__input_type_password"
          placeholder="Пароль"
          value={data.password}
          onChange={handleChange}
          required
        ></input>
        <button type="submit" className="auth__send" aria-label="Войти">
          Зарегистрироваться
        </button>
      </form>
      <p className="auth__text">
        Уже зарегистированы?{" "}
        <a className="auth__link" href="/signin">
          Войти
        </a>
      </p>
    </div>
  );
};

export default withRouter(Register);
