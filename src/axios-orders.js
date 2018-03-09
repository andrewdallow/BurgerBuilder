import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-871bd.firebaseio.com/'
});
export default instance;
