import axios from 'axios';
import API from '../constants/apis';
import { getValidToken } from '../utils/auth';
import {useAuth} from '../../context/authContext';


const getAuthConfig = async () => {
  const {updateToken } = useAuth();
  const token = await getValidToken(updateToken);
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

const submitDatePlanInfo = async (formData) => {
  try {
    const response = await axios.post(API.DATEPLANINFO, formData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getDatePlanById = async (uuid) => {
  try {
    const url = `${API.DATEPLAN}?uuid=${uuid}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getDatePlansById = async (uuid) => {
  try {
    const url = `${API.DATEPLAN}?plan_info=${uuid}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getDatePlanInfos = async () => {
  try {
    const response = await axios.get(API.DATEPLANINFO, getAuthConfig());
    const userPlanInfos = response.data.results;
    return userPlanInfos;
  } catch (error) {
    console.log(error);
  }
};

const getDatePlans = async () => {
  try {
    const response = await axios.get(API.DATEPLAN, getAuthConfig());
    const userPlans = response.data.results;
    return userPlans;
  } catch (error) {
    console.log(error);
  }
};

export default {
  submitDatePlanInfo,
  getDatePlanById,
  getDatePlansById,
  getDatePlanInfos,
  getDatePlans
};