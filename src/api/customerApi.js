import axios from "axios";
import { getTokenFromLocalStorage } from "../utils/auth";

export const getCustomersOrders = async (id, limit, offset) => {
  try {
    const { data } = await axios.get(`/order/customer/${id}`, {
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



export const getCustomers = async ( limit, offset) => {
  try {
    const { data } = await axios.get("/customer", {
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