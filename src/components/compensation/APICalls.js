import axios from 'axios';
import { BASE_URL } from '../../OfferAPI';

const getSessionToken = () => {
  const token = localStorage.getItem('token');
  return token;
};

const postWithToken = async (url, data) => {
  const token = getSessionToken();
  if (token == null) {
    return Error('Could not retreive session token');
  }
  const resp = await axios.post(url, data, {
    headers: {
      Authentication: token,
    },
  });
  return resp.data.fed_tax_percentage;
};

// eslint-disable-next-line import/prefer-default-export
export const getFedTaxPercentage = async (income) => postWithToken(`${BASE_URL}api_v1/fed_taxes`, { income, married: 'not-married' });
