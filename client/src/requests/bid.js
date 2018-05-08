const DOMAIN = 'localhost:3000';
const API_PATH = '/api/v1';
const BASE_URL = `http://${DOMAIN}${API_PATH}`

function getJWT () {
  return localStorage.getItem('JWT');
}

// REQUEST METHODS

export const Bid = {
  create(params,location) {
    return fetch(
      `${BASE_URL}${location}/bids`,
      {
        method: 'POST',
        headers: {
          'Authorization' : getJWT(),
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(params)
      }
    ).then(response => response.json())
  }
}

// export { Question };
