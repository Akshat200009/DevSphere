import axios from "axios";

const API = axios.create({

  baseURL: "https://devsphere-1-8c1h.onrender.com"
});

// ADD TOKEN AUTOMATICALLY

API.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem("token");

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {

    return Promise.reject(error);
  }
);

export default API;