import axios from "axios";
import { getTokenFromLocalStorage } from "../utils/auth";


export const getDispatchers = async (limit, offset) => {
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

// const getDispatcher = async (id, token, _limit, offset) => {
//   try {
//     const { data } = await axios.get(API_URL + `/api/dispatcher/${id}`, {
//       headers: {
//         // "Accept-Language": "en-US,en;q=0.8",
//         // "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${token}`,
//       },
//       crossDomain: true,
//     });
//     return data;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };

// const addDispatcher = async (payload, token) => {
//   try {
//     const response = await axios.post(API_URL + "/api/dispatcher", payload, {
//       headers: {
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

// const updateDispatcher = async (id, token, payload) => {
//   try {
//     const response = await axios.put(
//       API_URL + `/api/dispatcher/${id}`,
//       payload,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         crossDomain: true,
//       }
//     );
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
