// property-service.js

import axios from 'axios';
import authHeader from './auth-header';


const API_URL = "http://localhost:3003/api/v1/";

const getAllProperties = (page = 1, perPage = 6) => {
    return axios.get(`${API_URL}properties?page=${page}&per_page=${perPage}`, { headers: authHeader() });
};

const updateProperty = (propertyId, propertyData) => {
  const requestData = {
    property: propertyData
  };
  const headers = authHeader();
  console.log("Sending headers:", headers);
  return axios.put(`${API_URL}properties/${propertyId}`, requestData, { headers: authHeader() });
};

const toggleFavoriteProperty = (propertyId) => {
  return axios.post(`${API_URL}favorite_lists`, { property_id: propertyId }, { headers: authHeader() });
};

const getFavoriteProperties = () => {
  return axios.get(`${API_URL}favorite_lists`, { headers: authHeader() });
};

const searchProperties = (searchCriteria) => {
  const requestData = {
    search: searchCriteria
  };
  return axios.post(`${API_URL}search_properties/search`, requestData, { headers: authHeader() });
};


export default {
  getAllProperties,
  updateProperty,
  toggleFavoriteProperty,
  getFavoriteProperties,
  searchProperties
};
