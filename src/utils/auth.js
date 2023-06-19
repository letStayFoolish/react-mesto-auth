export const BASE_URL = 'https://auth.nomoreparties.co';

// Check response from promises:
function checkResponse(response) {
    if (!response.ok) {
        return Promise.reject(`ERROR: ${response.status}`);
    }
    return Promise.resolve(response.json());
}
export const register = (email, password) => {
  return (
    fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then(checkResponse)
  );
};
