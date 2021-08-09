//file rename
class Api {
  constructor(options) {
    this.baseURL = options.baseURL;
    this.headers = options.headers;
  }

  getInitialCards() {
    return fetch(this.baseURL + "/cards", {
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addCard(name, link) {
    return fetch(this.baseURL + "/cards/", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((data) => {
        return data.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard(cardId) {
    return fetch(this.baseURL + "/cards/" + cardId, {
      method: "DELETE",
      headers: this.headers,
    }).catch((err) => {
      console.log(err);
    });
  }

  likeCard(cardId) {
    return fetch(this.baseURL + "/cards/" + cardId + "/likes/", {
      method: "PUT",
      headers: this.headers,
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  removeCardLike(cardId) {
    return fetch(this.baseURL + "/cards/" + cardId + "/likes/", {
      method: "DELETE",
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked === true) {
      return this.removeCardLike(cardId);
    } else {
      return this.likeCard(cardId);
    }
  }

  getUserInfo() {
    return fetch(this.baseURL + "/users/me", {
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setUserInfo(name, about) {
    return fetch(this.baseURL + "/users/me", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res;
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateAvatar(link) {
    return fetch(this.baseURL + "/users/me/avatar", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res;
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setHeaders(jwt) {
    this.headers.authorization = jwt;
  }
}

let options = {
  baseURL: "https://api.hosfatantabolis.ru",
  headers: {
    authorization: "",
    // cohort: "cohort-17",
    "Content-Type": "application/json",
  },
};
const api = new Api(options);
export default api;
