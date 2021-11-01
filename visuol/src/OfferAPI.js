import axios from 'axios';

const BASE_URL = 'http://localhost:5000/';

// Calls the backend api and receives the offer
export function getOffer(offerId) {
  axios.get(`${BASE_URL}api_v1/create_offer/${offerId}`)
    .then((response) => response);
}

// Calls the backend api to post the offer in the database
export function postOffer(offer) {
  axios.post(`${BASE_URL}/api_v1/create_offer`, offer)
    .then((response) => response);
}
