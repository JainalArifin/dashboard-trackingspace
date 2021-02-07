import Axios from 'axios';

let BASE_URL = 'https://api-trackingspace.herokuapp.com';
// let BASE_URL = 'http://localhost:3000';

// setup axios
const AXIOS = token =>
  Axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
      authorization: token ? token : ''
    }
  });

const initializers = {
  AXIOS,
  BASE_URL
};

export default initializers;
