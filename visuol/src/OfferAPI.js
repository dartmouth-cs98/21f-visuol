import axios from 'axios';

export const BASE_URL = 'http://localhost:5000/';

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
  const data = Object.assign(offer);
  data.base = Number.parseInt(offer.base, 10);
  data.bonus = Number.parseInt(offer.bonus, 10);
  data.matchPercentage = Number.parseInt(offer.matchPercentage, 10);
  data.stocks = Number.parseInt(offer.stocks, 10);
  data.PTO = Number.parseInt(offer.PTO, 10);
  const tokenString = localStorage.getItem('token');
  const headers = {
    Authorization: tokenString,
    // 'Access-Control-Allow-Origin': 'http://localhost:3000'
  };

  console.log('createOfferData', data);

  axios.post(`${BASE_URL}api_v1/create_offer`, offer, {
    headers,
  })
    .then((response) => {
      console.log('submitted', response);
      return response;
    });
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

export const shareOffer = async (id, email) => {
  const tokenString = localStorage.getItem('token');

  const headers = {
    Authorization: tokenString,
  };

  const data = { id, email };

  const result = await axios.post(`${BASE_URL}api_v1/share_offer`, data, {
    headers,
  });

  return result;
};

export const myAccount = async () => {
  const tokenString = localStorage.getItem('token');

  const config = {
    Authorization: tokenString,
  };

  const userAccount = await axios.get(`${BASE_URL}api_v1/user`, { headers: config })
    .then((response) => response.data);

  return userAccount.company;
};

export const myShared = async () => {
  console.log('getting shared');
  const tokenString = localStorage.getItem('token');

  const config = {
    Authorization: tokenString,
  };

  const offers = await axios.get(`${BASE_URL}api_v1/get_shared`, { headers: config })
    .then((response) => response.data);
  console.log(offers);
  return offers;
};

export const removeOffer = async (id) => {
  const tokenString = localStorage.getItem('token');

  const headers = {
    Authorization: tokenString,
  };
  console.log(tokenString);
  console.log(headers);

  const result = await axios.delete(`${BASE_URL}api_v1/remove_offer`, {
    headers,
    data: {
      id,
    },
  });

  return result;
};
