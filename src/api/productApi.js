import axios from "axios";
import { getTokenFromLocalStorage } from "../utils/auth";


export const getProducts = async (limit, offset) => {
    try {
        const { data } = await axios.get("/product", {
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

export const getProductImages = async () => {
  try {
    const { data } = await axios.get(`/product/image`, {
      headers: {
        "Content-Type": "multipart/form-data",
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


export const getProductById = async (id) => {
  try {
    const { data } = await axios.get(`/product/${id}`, {
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

export const editProduct = async (id, payload) => {
  try {
    const { data } = await axios.put(`/product/${id}`, payload, {
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

export const addProductImages = async (payload) => {
  try {
    const { data } = await axios.post(`/product/image`, payload, {
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

export const assignProductImages = async (productId, payload) => {
  try {
    const { data } = await axios.post(`/product/${productId}/assignImage`, payload, {
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

export const unAssignProductImages = async (productId, imageId) => {
  try {
    const { data } = await axios.delete(`/product/${productId}/removeImage/${imageId}`, {
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

export const addProductApi = async (payload) => {
  try {
    const {data} = await axios.post("/product", payload, {
      headers: {
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
      crossDomain: true,
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