//file rename
class Api {
  constructor(options) {
    this.baseURL = options.baseURL;
    this.headers = options.headers;
  }

  getInitialCards() {
    return fetch(this.baseURL + "/v1/" + this.headers.cohort + "/cards", {
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
    return fetch(this.baseURL + "/v1/" + this.headers.cohort + "/cards/", {
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
    return fetch(
      this.baseURL + "/v1/" + this.headers.cohort + "/cards/" + cardId,
      {
        method: "DELETE",
        headers: this.headers,
      }
    ).catch((err) => {
      console.log(err);
    });
  }

  likeCard(cardId) {
    return fetch(
      this.baseURL + "/v1/" + this.headers.cohort + "/cards/likes/" + cardId,
      {
        method: "PUT",
        headers: this.headers,
      }
    )
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  removeCardLike(cardId) {
    return fetch(
      this.baseURL + "/v1/" + this.headers.cohort + "/cards/likes/" + cardId,
      {
        method: "DELETE",
        headers: this.headers,
      }
    )
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

  changeLikeCardStatus(cardId, isLiked){
    if(isLiked === true){
      return this.removeCardLike(cardId);
    }else{
      return this.likeCard(cardId);
    }
  }

  getUserInfo() {
    return fetch(this.baseURL + "/v1/" + this.headers.cohort + "/users/me", {
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
    return fetch(this.baseURL + "/v1/" + this.headers.cohort + "/users/me", {
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
    return fetch(
      this.baseURL + "/v1/" + this.headers.cohort + "/users/me/avatar",
      {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify({
          avatar: link,
        }),
      }
    )
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
}

const options = {
  baseURL: "https://mesto.nomoreparties.co",
  headers: {
    authorization: "9451417e-55c5-458c-a47b-214236171470",
    cohort: "cohort-17",
    "Content-Type": "application/json",
  },
};
const api = new Api(options);
export default api;
