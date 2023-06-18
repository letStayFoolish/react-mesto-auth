class Api {
  constructor({ url, headers }) {
    this._url = url;
    this.headers = headers;
  }

  // Check response from promises:
  _checkResponse(response) {
    if (!response.ok) {
      return Promise.reject(`ERROR: ${response.status}`);
    }
    return Promise.resolve(response.json());
  }

  // Request to get user information from the server:
  async getUserInformation() {
    const response = await fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this.headers,
    });
    return this._checkResponse(response);
  }

  // Request to get and render cards from the server:
  async getInitialCards() {
    const response = await fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this.headers,
    });
    return this._checkResponse(response);
  }

  // Request to edit profile (PATCH):
  async sendProfileInformation({ name, about }) {
    const response = await fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });
    return this._checkResponse(response);
  }

  // Request to post cards on server:
  async addNewCard({ name, link }) {
    const response = await fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });
    return this._checkResponse(response);
  }

  // Request to remove card from server:
  async removeCard(cardId) {
    const response = await fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    });
    return this._checkResponse(response);
  }

  // Request to add likes on cards on server:
  async addLikes(cardId) {
    const response = await fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.headers,
    });
    return this._checkResponse(response);
  }
  // Request to remove likes from cards on server:
  async removeLikes(cardId) {
    const response = await fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.headers,
    });
    return this._checkResponse(response);
  }
  // Request to change avatar image on server:
  async changeAvatarImage({ avatar }) {
    const response = await fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar,
      }),
    });
    return this._checkResponse(response);
  }
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '1513e1ce-293c-41a3-bbe1-1734a1dc9636',
    'Content-Type': 'application/json',
  },
});

export default api;
