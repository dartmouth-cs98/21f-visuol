import axios from 'axios'

var BASE_URL = 'http://localhost:5000/';


// Calls the backend api and receives the offer
export function getOffer(offer_id) {
    axios.get(BASE_URL + 'api_v1/create_offer/' + offer_id)
    .then(response => {
        return response
    })
}

// Calls the backend api to post the offer in the database
export function postOffer(offer) {
    const tokenString = localStorage.getItem('token');
    const headers = {
        'Authorization':  tokenString,
        // 'Access-Control-Allow-Origin': 'http://localhost:3000'
      }

    axios.post(BASE_URL + 'api_v1/create_offer', offer, {
        headers: headers
    })
    .then(response => {
        return response
    })
}
