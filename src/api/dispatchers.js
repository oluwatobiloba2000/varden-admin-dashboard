import axios from "axios";
import { getTokenFromLocalStorage } from "../utils/auth";


export const getDispatchers = async () => {
    try {
        const { data } = await axios.get("/dispatcher", {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          },
        });
    
        return {  
            success: true,
            data: data.data
        };
    
      } catch (error) {
        let errorMessage = error.message;
        return {success: false, error: errorMessage}
      }
};

export const getDispatcherById = async (id) => {
  try {
    const res = await axios.get(`/dispatcher/${id}`,  {
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

export const createDispatcherApi = async (payload) => {
  try {
    const res = await axios.post(`/dispatcher`, payload, {
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