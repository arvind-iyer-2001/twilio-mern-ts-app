import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://twilio-mern-ts-server.onrender.com/',

  headers: {
    'Content-Type': 'application/json',
  },
});


export default axiosInstance;