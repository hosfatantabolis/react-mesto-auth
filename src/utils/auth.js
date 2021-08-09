class Auth {
  constructor(options) {
    this.baseURL = options.baseURL;
    this.headers = options.headers;
  }
  register(password, email) {
    return fetch(this.baseURL + "/signup", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ password, email }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      console.log(res);
      return Promise.reject(res);
    });
  }

  login(password, email) {
    return fetch(this.baseURL + "/signin", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ password, email }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    });
  }

  tokenCheck(jwt) {
    return fetch(this.baseURL + "/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: jwt,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    });
  }
}


const options = {
  baseURL: "https://apimovies.hosfatantabolis.ru",
  headers: {
    "Content-Type": "application/json",
  },
};
const auth = new Auth(options);
export default auth;
