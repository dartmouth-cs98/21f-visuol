import axios from 'axios';

const BASE_URL = 'http://localhost:5000/';

// Calls the backend api and receives the offer
export const getOffer = async (data) => {
  const tokenString = localStorage.getItem('token');

  const config = {
    Authorization: tokenString,
  };

  const offer = await axios.get(`${BASE_URL}api_v1/users_offers`, data, { headers: config })
    .then((response) => response.data);

  return offer;
};

// Calls the backend api to post the offer in the database
export function postOffer(offer) {
  const tokenString = localStorage.getItem('token');
  const headers = {
    Authorization: tokenString,
    // 'Access-Control-Allow-Origin': 'http://localhost:3000'
  };

  axios.post(`${BASE_URL}api_v1/create_offer`, offer, {
    headers,
  })
    .then((response) => response);
}

// retrieves a list of all the offers that a user has
export const myOffers = async () => {
  const tokenString = localStorage.getItem('token');

  const config = {
    Authorization: tokenString,
  };

  const offers = await axios.get(`${BASE_URL}api_v1/users_offers`, { headers: config })
    .then((response) => response.data);

  return offers;
};
