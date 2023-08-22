import axios from 'axios';
import API from '../constants/apis';
import { getValidToken } from '../utils/auth';

const getAuthConfig = () => {
  const token = getValidToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

const getUserDetails = async (userId) => {
  try {
    const response = await axios.get(`${API.USERS}${userId}/`, getAuthConfig());
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw new Error('An error occurred while fetching user details');
  }
};

const addFavorite = async (userId, planId) => {
  try {
    const response = await axios.get(`${API.DATEPLAN}/${planId}`);
    const planData = response.data;
    const result = await axios.post(`${API.DATEPLAN}/${userId}/favorites`, {
      plan: planData
    });
    return result.data;
  } catch (error) {
    console.error('Failed to add favorite:', error);
    throw error;
  }
};

const removeFavorite = async (userId, planId) => {
  return await fetch(`${API.DATEPLAN}/${userId}/favorites/${planId}`, {
    method: 'DELETE'
  });
};

export default {
  getUserDetails,
  addFavorite,
  removeFavorite
};