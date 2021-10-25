import axios from 'axios'

// Calls the backend api and receives the offer
function getOffer(offer_id) {
    axios.get('' + 'api_v1/create_offer/' + offer_id)
    .then(response => {
        return response
    })
}

// Calls the backend api to post the offer in the database
function postOffer(offer) {
    axios.post('' + '/api_v1/create_offer', offer)
    .then(response => {
        return response
    })
}