import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakerapi.it/api/v2',
});

export default api;
