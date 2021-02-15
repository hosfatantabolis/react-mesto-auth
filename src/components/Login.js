import { useState } from "react";
import { useHistory } from "react-router-dom";
const Login = ({ onLogin }) => {
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
    onLogin(data.password, data.email).then(history.push("/"));
    console.log(data.email, data.password);
  };
  return (
    <div className="auth auth_type_login">
      <h2 className="auth__title">Вход</h2>
      <form onSubmit={handleSubmit} className="auth__form">
        <input
          type="email"
          name="email"
          className="auth__input auth__input_type_email"
          placeholder="Email"
          onChange={handleChange}
          required
        ></input>
        <input
          type="password"
          name="password"
          className="auth__input auth__input_type_password"
          placeholder="Пароль"
          onChange={handleChange}
          required
        ></input>
        <button type="submit" className="auth__send" aria-label="Войти">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
