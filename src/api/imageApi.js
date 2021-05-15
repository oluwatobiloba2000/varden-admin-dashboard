import axios from "axios";
import { getTokenFromLocalStorage } from "../utils/auth";

export const getPromotionImages = async () => {
    try {
      const { data } = await axios.get(`/promotion/image`, {
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

  
export const addPromotionImages = async (payload) => {
    try {
      const { data } = await axios.post(`/promotion/image`, payload, {
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