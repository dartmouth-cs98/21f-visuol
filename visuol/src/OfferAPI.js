import axios from 'axios'

BASE_URL = 'http://localhost:5000/'

// Calls the backend api and receives the offer
function getOffer(offer_id) {
    axios.get(BASE_URL + 'api_v1/create_offer/' + offer_id)
    .then(response => {
        return response
    })
}

// Calls the backend api to post the offer in the database
function postOffer(offer) {
    axios.post(BASE_URL + '/api_v1/create_offer', offer)
    .then(response => {
        return response
    })
}