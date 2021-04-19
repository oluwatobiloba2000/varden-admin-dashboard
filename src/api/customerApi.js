import axios from "axios";
import { getTokenFromLocalStorage } from "../utils/auth";


// POST/api/customer/:customerId/address
// const getCustomerAddress = async ({ token, id }, limit, offset) => {
//   try {
//     const { data } = await axios.get(API_URL + `/customer/${id}/address`, {
//       headers: {
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

// const getCustomerOrders = async ({ token, id }, limit, offset) => {
//   try {
//     const { data } = await axios.get(API_URL + `/api/order/customer/${id}`, {
//       headers: {
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

// const getCustomerId = async (id, limit, offset) => {
//   try {
//     // alert(id)

//     const { data } = await axios.get(API_URL + `/api/customer/${id}`);
//     console.log(data.data.images);
//     return data;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };

// const editCustomer = async (id, token, payload) => {
//   try {
//     // alert(id)

//     const { data } = await axios.put(API_URL + `/api/customer/${id}`, payload, {
//       headers: {
//         "Accept-Language": "en-US,en;q=0.8",
//         // "Content-Type": "applicatiom/json",
//         // "Access-Control-Allow-Origin": "*",
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${token}`,
//       },
//       crossDomain: true,
//     });
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };

// const addCustomer = async (payload, token) => {
//   // const res = await axios.post(API_URL + "/api/login", data);
//   const response = await axios.post(API_URL + "/api/customer", payload, {
//     headers: {
//       "Accept-Language": "en-US,en;q=0.8",
//       "Content-Type": "multipart/form-data",
//       // "Access-Control-Allow-Origin": "*",
//       Authorization: `Bearer ${token}`,
//     },
//     crossDomain: true,
//   });
//   if (response && response.data) {
//     return response.data;
//   }
// };
// const deleteCustomer = async (customer) => {
//   const customerId = customer.id;
//   const payload = {
//     images: customer.images,
//   };
//   const response = await axios.delete(
//     `${API_BASE_URL}/customer/${customerId}`,
//     payload,
//     {
//       headers: {
//         Authorization: `Bearer ${Cookies.get("commerce_jwt")}`,
//       },
//     }
//   );
//   resolve(response.data);
// };