import axios from 'axios';




let cookie = document.cookie;
const axiosInstance = () => {
    // const baseURL = process.env.REACT_APP_BASE_URL || 'https://fintrackc.herokuapp.com';
      const baseURL = 'http://localhost:3000';

    //axios.defaults.withCredentials = true
    return axios.create({
        baseURL,
        headers: {
        'Content-Type': 'application/json',
          Accept: 'application/json',
        Authorization: 'Bearer ' + cookie.split('=')[1]
      },
    });
};
  
export default axiosInstance;
 
 