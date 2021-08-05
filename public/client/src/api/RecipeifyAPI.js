// Third Party Imports
import axios from 'axios';

// Axios Configuration for recipiefy API
const axiosConfig = {
  baseURL: '/api/v1',
};

export default axios.create(axiosConfig);
