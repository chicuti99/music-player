import { User } from "../utils/interfaces";
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_KEY || '',
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    setBasicAuth()
    //history.push("/");
    return Promise.reject(error);
  }
);


export const setBasicAuth = (user? : User) => {
  const userSaved = localStorage.getItem('user');
    if(userSaved){
      const parsedUser = JSON.parse(userSaved)
      const token = btoa(`${parsedUser.username}:${parsedUser.password}`); 
      api.defaults.headers.common['Authorization'] = `Basic ${token}`;
    }
  else if(user){
    const token = btoa(`${user.username}:${user.password}`); 
    api.defaults.headers.common['Authorization'] = `Basic ${token}`;
  }
};

export default api;