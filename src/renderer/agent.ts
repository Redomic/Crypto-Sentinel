import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000/';

const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

const blockchain = {
  getNodes: () => instance.get('/nodes'),
};

export default { blockchain };
