import axios from "axios";
import { getTokenFromLocalStorage } from "../utils/auth";

export const getAdmin = async (data) => {
    
  try {
    const res = await axios.get("/admin",  {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        }
     })
    return {
     success: true,
     data:  res.data.data
    };
  } catch (error) {
      let errorMessage = error.message;
      return {success: false, error: errorMessage}
  }
};

export const getAdminDetails = async (id) => {
try {
  const res = await axios.get(`/admin/${id}`,  {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      }
   })
  return {
   success: true,
   data:  res.data.data
  };
} catch (error) {
    let errorMessage = error.message;
    return {success: false, error: errorMessage}
}
};


export const addAdmin = async (payload) => {
  try {
    const {data} = await axios.post(`/admin`, payload,  {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        }
     })
    return {
     success: true,
     data:  data.data
    };
  } catch (error) {
      let errorMessage = error.message === 'Network Error' ? error.message : (error.response.data && error.response.data.email) ? error.response.data.email : error.message
      return {success: false, error: errorMessage}
  }
  };
  