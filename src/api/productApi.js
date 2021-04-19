  
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

// export const getProductImages = async (token, limit, offset) => {
//   try {
//     const { data } = await axios.get(API_URL + "/api/product/image", {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return data;
//   } catch (err) {
//     if (err.response && err.response.status == 401) {
//       return Promise.reject(err);
//     }
//     console.log(err);
//     return Promise.reject(err);
//   }
// };

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

// const editProduct = async (id, token, payload) => {
//   try {
//     const { data } = await axios.put(API_URL + `/api/product/${id}`, payload, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return data;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

// const addProduct = async (payload, token) => {
//   try {
//     const response = await axios.post(API_URL + "/api/product", payload, {
//       headers: {
//         "Accept-Language": "en-US,en;q=0.8",
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${token}`,
//       },
//       crossDomain: true,
//     });
//     if (response && response.data) {
//       return response.data;
//     }
//   } catch (err) {
//     if (err.response && err.response.status == 401) {
//       Promise.reject(err);
//     }
//     console.log(err);
//     return Promise.reject(err);
//   }
// };

// export const addProductImage = async (payload, token) => {
//   try {
//     const response = await axios.post(API_URL + "/api/product/image", payload, {
//       headers: {
//         "Accept-Language": "en-US,en;q=0.8",
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${token}`,
//       },
//       crossDomain: true,
//     });
//     if (response && response.data) {
//       return response.data;
//     }
//   } catch (err) {
//     console.log(err);
//     throw new Error(err);
//   }
// };

// export const assignProductImage = async (productId, payload, token) => {
//   try {
//     const response = await axios.post(
//       API_URL + `/api/product/${productId}/assignImage`,
//       payload,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         crossDomain: true,
//       }
//     );
//     if (response && response.data) {
//       return response.data;
//     }
//   } catch (err) {
//     console.log(err);
//     throw new Error(err);
//   }
// };

// export const unAssignProductImage = async (productId, imageId, token) => {
//   try {
//     const response = await axios.delete(
//       API_URL + `/api/product/${productId}/removeImage/${imageId}`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         crossDomain: true,
//       }
//     );
//     if (response && response.data) {
//       return response.data;
//     }
//   } catch (err) {
//     console.log(err);
//     throw new Error(err);
//   }
// };

// const deleteProduct = async (product) => {
//   const productId = product.id;
//   const payload = {
//     images: product.images,
//   };
//   const response = await axios.delete(`${API_URL}/${productId}`, payload, {
//     headers: {
//       Authorization: `Bearer ${Cookies.get("commerce_jwt")}`,
//     },
//   });
//   resolve(response.data);
// };
