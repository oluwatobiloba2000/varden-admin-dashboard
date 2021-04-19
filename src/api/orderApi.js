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

// const getOrderId = async (id, token) => {
//   try {
//     // alert(id)

//     const { data } = await axios.get(API_URL + `/api/order/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return data;
//   } catch (err) {
//     if (err.response && err.response.status == 401) {
//       return Promise.reject(err);
//     }
//     return Promise.reject(err);
//   }
// };

// const editOrder = async (id, token, payload) => {
//   try {
//     const { data } = await axios.put(API_URL + `/api/order/${id}`, payload, {
//       headers: {
//         "Accept-Language": "en-US,en;q=0.8",
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${token}`,
//       },
//       crossDomain: true,
//     });
//     return data;
//   } catch (err) {
//     if (err.response && err.response.status == 401) {
//       return Promise.reject(err);
//     }
//     alert("err");
//     return Promise.reject(err);
//   }
// };

// // POST / api / order /: customerId: Submit customers order
// // JSON body {
// //     "delivery_cost" => required | integer,
// //         "tax" => required | integer,
// //             "delivery_address" => required | string,
// //                 "total_cost" => required | integer,
// //                     "products" => required | array of objects
// //                     [
// //                         {
// //                             "id" => required | integer,
// //                             "image_url" => required | URL string,
// //                             "name" => required | string,
// //                             "quantity" => required | integer,
// //                             "price_per_unit" => required | integer,
// //                             "price" => required | integer
// //                         }
// //                     ]

// // }

// const addOrder = async ({ id, payload }, token) => {
//   const response = await axios.post(API_URL + `/api/order/${id}`, payload, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   if (response && response.data) {
//     return response.data;
//   }
// };

// const deleteOrder = async (order) => {
//   const orderId = order.id;
//   const payload = {
//     images: order.images,
//   };
//   const response = await axios.delete(
//     `${API_BASE_URL}/order/${orderId}`,
//     payload,
//     {
//       headers: {
//         Authorization: `Bearer ${Cookies.get("commerce_jwt")}`,
//       },
//     }
//   );
//   resolve(response.data);
// };

// const assignOrderDispatcher = async (orderId, dispatcherId, token) => {
//   try {
//     //vardenapi.herokuapp.com/api/dispatcher/1/assignOrder/40

//     const { data } = await axios.put(
//       API_URL + `/api/dispatcher/${dispatcherId}/assignOrder/${orderId}`,
//       {},
//       {
//         headers: {
//           "Accept-Language": "en-US,en;q=0.8",
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//         crossDomain: true,
//       }
//     );
//     return data;
//   } catch (err) {
//     if (err.response && err.response.status == 401) {
//       return Promise.reject(err);
//     }

//     return Promise.reject(err);
//   }
// };

// const assignDcsToOrder = async (orderId, dcsId, token) => {
//   try {
//     const { data } = await axios.put(
//       API_URL + `/api/order/${orderId}/assignDcs/${dcsId}`,
//       {},
//       {
//         headers: {
//           "Accept-Language": "en-US,en;q=0.8",
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//         crossDomain: true,
//       }
//     );
//     return data;
//   } catch (err) {
//     if (err.response && err.response.status == 401) {
//       return Promise.reject(err);
//     }

//     return Promise.reject(err);
//   }
// };