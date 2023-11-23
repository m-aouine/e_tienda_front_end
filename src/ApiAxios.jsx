
import axios from 'axios';

const ApiAxios= axios.create({
    baseURL: 'http://127.0.0.1:8000/api/', 
  });
  //http://127.0.0.1:8000]

  //'https://jsonplaceholder.typicode.com/'
  ApiAxios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  export default ApiAxios;

