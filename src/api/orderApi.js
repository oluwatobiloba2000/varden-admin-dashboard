import axios from "axios";
import { getTokenFromLocalStorage } from "../utils/auth";

export const getOrders = async (token, limit, offset) => {
  try {
    const { data } = await axios.get("/order", {
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


export const getOrdersById = async (id) => {
  try {
    const { data } = await axios.get(`/order/${id}`, {
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

export const edit_order_api = async (id, payload) => {
  try {
    const { data } = await axios.put(`/order/${id}`, payload, {
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


export const update_payment_api = async (id, payload) => {
  try {
    const { data } = await axios.put(`/order/${id}/updateStatusOnPayment`, payload, {
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

export const assignDispatchRiderApi = async (dispatcherId, orderId) => {
  try {
    const { data } = await axios.put(`/dispatcher/${dispatcherId}/assignOrder/${orderId}`, {
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


export const assignDistributionCenterApi = async (dsc_id, orderId) => {
  try {
    const { data } = await axios.put(`/order/${orderId}/assignDcs/${dsc_id}`, {
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