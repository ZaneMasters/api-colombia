import axios from 'axios';

const API_BASE_URL = 'https://api-colombia.com/api/v1/';

export const getPresidents = async () => {
  const response = await axios.get(`${API_BASE_URL}President`);
  return response.data;
};

export const getAirports = async () => {
  const response = await axios.get(`${API_BASE_URL}Airport`);
  return response.data;
};

export const getTouristicAttractions = async () => {
  const response = await axios.get(`${API_BASE_URL}TouristicAttraction`);
  return response.data;
};
