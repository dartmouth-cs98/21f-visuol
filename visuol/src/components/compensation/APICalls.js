import axios from 'axios';

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
export const getFedTaxPercentage = async (income) => postWithToken('localhost:5000/api_v1/fed_taxes', { income, married: 'not-married' });
