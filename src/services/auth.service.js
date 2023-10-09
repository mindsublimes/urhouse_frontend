import axios from "axios";

const API_URL = "http://localhost:3003/api/v1/auth/";

const register = (email, password, password_confirmation) => {
  const requestData = {
    user: {
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    },
  };
  return axios
    .post(API_URL + "signup", requestData)
    .then((response) => {
      if (response.data.authentication_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    }).catch((error) => {
      debugger
      // Return an error with a message
      return Promise.reject(error.response.data.errors[0]);
    });
};

const login = (username, password) => {
  debugger
  const requestData = {
    user: {
      email: username,
      password: password,
    },
  };
  return axios
    .post(API_URL + "login", requestData)
    .then((response) => {
      if (response.data.authentication_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }else {
        // If login failed, reject the Promise with an error message
        return Promise.reject("Login failed. Please check your credentials.");
      }
      return response.data;
    }).catch((error) => {
      debugger
      // Return an error with a message
      return Promise.reject("Network error. Please try again later.");
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};